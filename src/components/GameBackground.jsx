import { useEffect, useRef } from 'react';

/* ═══════════════════════════════════════════════════════════════
   GameBackground v2 — INTENSE retro pixel-art battlefield
   Bigger city, bigger fighters, more explosions, diving, 
   blasting, breaking — full chaos mode.
   ═══════════════════════════════════════════════════════════════ */

// ─── Color palette (Sunset Arcade theme) ───
const C = {
    stars: '#fbbf24',
    buildDark: '#1a1225',
    buildMid: '#241832',
    buildLight: '#2f1f42',
    buildAccent: '#150e1f',
    windowOff: '#170f22',
    windowOn: '#f59e0b',
    windowBright: '#d97706',
    ground: '#c4a26a',
    groundLine: '#a8894a',
    // Fighters
    f1: '#b45309', f2: '#dc2626', f3: '#16a34a', f4: '#9333ea',
    f5: '#0284c7', f6: '#d97706',
    // FX
    bullet: '#f59e0b',
    bulletTrail: '#ef4444',
    laser: '#d97706',
    muzzle: '#fff7ed',
    expColors: ['#dc2626', '#ef4444', '#f59e0b', '#fbbf24', '#fde68a', '#ffffff'],
    smoke: ['#a8a29e', '#b0a090', '#c0b0a0', '#d0c0b0'],
    spark: ['#fbbf24', '#ffffff', '#f59e0b', '#fde68a'],
    debris: ['#92400e', '#a0522d', '#b8860b', '#cd853f'],
};

// ─── Utility ───
const rand = (min, max) => min + Math.random() * (max - min);
const randInt = (min, max) => Math.floor(rand(min, max));
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

// ═══════════════════════════════════════
//  BUILDINGS
// ═══════════════════════════════════════
function generateBuildings(w) {
    const buildings = [];
    let x = -100;
    while (x < w + 300) {
        const bw = randInt(60, 140);
        const bh = randInt(120, 380);
        const shade = pick([C.buildDark, C.buildMid, C.buildLight, C.buildAccent]);
        const depth = 0.15 + Math.random() * 0.85;
        const hasAntenna = Math.random() > 0.6;
        const antennaH = randInt(15, 40);
        const hasTank = Math.random() > 0.75;
        buildings.push({ x, w: bw, h: bh, shade, depth, hasAntenna, antennaH, hasTank });
        x += bw + randInt(4, 25);
    }
    return buildings.sort((a, b) => a.depth - b.depth); // back-to-front
}

function drawBuildings(ctx, buildings, canvasH, scrollY, frame) {
    const parallaxBase = scrollY * 0.06;
    for (const b of buildings) {
        const px = b.x - parallaxBase * b.depth;
        const by = canvasH - b.h;

        // Building body
        ctx.fillStyle = b.shade;
        ctx.fillRect(px, by, b.w, b.h);

        // Roof edge
        ctx.fillStyle = 'rgba(255,255,255,0.03)';
        ctx.fillRect(px, by, b.w, 2);

        // Antenna
        if (b.hasAntenna) {
            ctx.fillStyle = '#222244';
            ctx.fillRect(px + b.w / 2 - 1, by - b.antennaH, 2, b.antennaH);
            // Blinking light
            const blink = Math.sin(frame * 0.05 + b.x) > 0.5;
            ctx.fillStyle = blink ? '#ff2222' : '#440000';
            ctx.fillRect(px + b.w / 2 - 2, by - b.antennaH - 3, 4, 3);
        }

        // Water tank
        if (b.hasTank) {
            ctx.fillStyle = '#1a1a38';
            ctx.fillRect(px + b.w * 0.6, by - 12, 16, 12);
            ctx.fillStyle = '#222248';
            ctx.fillRect(px + b.w * 0.6 - 2, by - 14, 20, 3);
        }

        // Windows grid
        const winW = 4, winH = 6, gapX = 12, gapY = 14;
        for (let wy = by + 10; wy < canvasH - 20; wy += gapY) {
            for (let wx = px + 8; wx < px + b.w - 8; wx += gapX) {
                const flicker = Math.sin(wx * 13.7 + wy * 7.3 + frame * 0.003);
                if (flicker > 0.6) {
                    ctx.fillStyle = flicker > 0.85 ? C.windowBright : C.windowOn;
                } else {
                    ctx.fillStyle = C.windowOff;
                }
                ctx.fillRect(wx, wy, winW, winH);
            }
        }
    }
}

// ═══════════════════════════════════════
//  PARTICLE SYSTEM
// ═══════════════════════════════════════
class Particle {
    constructor(x, y, vx, vy, color, life, size, gravity = 0.15, drag = 0.98) {
        this.x = x; this.y = y;
        this.vx = vx; this.vy = vy;
        this.color = color;
        this.life = life; this.maxLife = life;
        this.size = size;
        this.gravity = gravity;
        this.drag = drag;
    }
    update() {
        this.vy += this.gravity;
        this.vx *= this.drag;
        this.vy *= this.drag;
        this.x += this.vx;
        this.y += this.vy;
        this.life--;
    }
    draw(ctx) {
        const t = this.life / this.maxLife;
        ctx.globalAlpha = t;
        ctx.fillStyle = this.color;
        const s = this.size * (0.3 + t * 0.7);
        ctx.fillRect(this.x - s / 2, this.y - s / 2, s, s);
        ctx.globalAlpha = 1;
    }
    get alive() { return this.life > 0; }
}

// ═══════════════════════════════════════
//  EXPLOSION EFFECTS
// ═══════════════════════════════════════
function spawnExplosion(particles, x, y, intensity = 1) {
    const count = Math.floor(12 * intensity);
    // Fire / sparks
    for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = rand(1, 5) * intensity;
        particles.push(new Particle(
            x, y,
            Math.cos(angle) * speed, Math.sin(angle) * speed,
            pick(C.expColors), randInt(15, 35), rand(2, 5 * intensity), 0.12, 0.96
        ));
    }
    // Smoke
    for (let i = 0; i < Math.floor(6 * intensity); i++) {
        particles.push(new Particle(
            x + rand(-8, 8), y + rand(-8, 8),
            rand(-0.5, 0.5), rand(-1.5, -0.3),
            pick(C.smoke), randInt(30, 60), rand(4, 10), 0.02, 0.99
        ));
    }
    // Debris
    for (let i = 0; i < Math.floor(5 * intensity); i++) {
        const angle = -Math.PI / 2 + rand(-1, 1);
        const speed = rand(2, 6);
        particles.push(new Particle(
            x, y,
            Math.cos(angle) * speed, Math.sin(angle) * speed,
            pick(C.debris), randInt(30, 60), rand(2, 4), 0.25, 0.97
        ));
    }
}

function spawnMuzzleFlash(particles, x, y, dir) {
    for (let i = 0; i < 4; i++) {
        particles.push(new Particle(
            x, y,
            dir * rand(2, 5), rand(-1, 1),
            pick(C.spark), randInt(4, 8), rand(1, 3), 0, 0.9
        ));
    }
}

function spawnDiveImpact(particles, x, y) {
    for (let i = 0; i < 10; i++) {
        const angle = -Math.PI / 2 + rand(-1.2, 1.2);
        particles.push(new Particle(
            x + rand(-5, 5), y,
            Math.cos(angle) * rand(1, 3), Math.sin(angle) * rand(1, 4),
            pick(C.spark), randInt(10, 25), rand(1, 3), 0.2, 0.95
        ));
    }
    // Dust cloud
    for (let i = 0; i < 6; i++) {
        particles.push(new Particle(
            x + rand(-10, 10), y,
            rand(-1, 1), rand(-0.5, -0.1),
            pick(C.smoke), randInt(20, 40), rand(4, 8), 0.01, 0.99
        ));
    }
}

// ═══════════════════════════════════════
//  BULLET
// ═══════════════════════════════════════
class Bullet {
    constructor(x, y, vx, vy, owner, isGrenade = false) {
        this.x = x; this.y = y;
        this.vx = vx; this.vy = vy;
        this.owner = owner;
        this.life = isGrenade ? 60 : 90;
        this.isGrenade = isGrenade;
    }
    update() {
        if (this.isGrenade) this.vy += 0.18;
        this.x += this.vx;
        this.y += this.vy;
        this.life--;
    }
    draw(ctx) {
        if (this.isGrenade) {
            ctx.fillStyle = '#ff4400';
            ctx.fillRect(this.x - 2, this.y - 2, 5, 5);
            ctx.fillStyle = '#ffaa00';
            ctx.fillRect(this.x - 1, this.y - 1, 3, 3);
        } else {
            // Bullet trail
            ctx.fillStyle = C.bulletTrail;
            ctx.globalAlpha = 0.4;
            ctx.fillRect(this.x - this.vx * 3, this.y, Math.abs(this.vx * 3), 1);
            ctx.globalAlpha = 1;
            // Bullet
            ctx.fillStyle = C.bullet;
            ctx.fillRect(this.x, this.y, 5, 2);
            // Glow
            ctx.fillStyle = C.muzzle;
            ctx.globalAlpha = 0.3;
            ctx.fillRect(this.x - 1, this.y - 1, 7, 4);
            ctx.globalAlpha = 1;
        }
    }
    get alive() { return this.life > 0; }
}

// ═══════════════════════════════════════
//  FIGHTER (bigger, more moves)
// ═══════════════════════════════════════
class Fighter {
    constructor(x, groundY, color, canvasW) {
        this.x = x;
        this.groundY = groundY;
        this.y = groundY;
        this.color = color;
        this.canvasW = canvasW;
        this.w = 12; this.h = 22;
        this.vx = rand(0.4, 1.0) * (Math.random() > 0.5 ? 1 : -1);
        this.vy = 0;
        this.facing = this.vx > 0 ? 1 : -1;
        this.grounded = true;
        // State: idle|run|shoot|melee|jump|dive|grenade|hit|dead
        this.state = 'run';
        this.stateTimer = 0;
        this.anim = 0;
        this.animTick = 0;
        this.hp = 5;
        this.maxHp = 5;
        this.alive = true;
        this.respawnTimer = 0;
        this.hitFlash = 0;
        this.shootCooldown = 0;
    }

    update(fighters, bullets, particles) {
        if (!this.alive) {
            this.respawnTimer--;
            if (this.respawnTimer <= 0) {
                this.alive = true;
                this.hp = this.maxHp;
                this.x = rand(50, this.canvasW - 50);
                this.y = this.groundY;
                this.state = 'run';
                this.hitFlash = 0;
            }
            return;
        }

        this.stateTimer--;
        this.animTick++;
        if (this.hitFlash > 0) this.hitFlash--;
        if (this.shootCooldown > 0) this.shootCooldown--;
        if (this.animTick % 6 === 0) this.anim++;

        // Gravity
        if (this.y < this.groundY) {
            this.vy += 0.35;
            this.grounded = false;
        } else {
            if (!this.grounded && (this.state === 'dive' || Math.abs(this.vy) > 5)) {
                spawnDiveImpact(particles, this.x, this.groundY);
            }
            this.y = this.groundY;
            this.vy = 0;
            this.grounded = true;
        }
        this.y += this.vy;

        // Face nearest enemy
        const faceNearest = () => {
            const n = this.findNearest(fighters);
            if (n) this.facing = n.x > this.x ? 1 : -1;
        };

        // ─── State transitions ───
        if (this.stateTimer <= 0 && this.grounded) {
            const r = Math.random();
            if (r < 0.25) {
                this.state = 'run';
                this.stateTimer = randInt(40, 100);
                this.vx = rand(0.5, 1.2) * (Math.random() > 0.5 ? 1 : -1);
                this.facing = this.vx > 0 ? 1 : -1;
            } else if (r < 0.45) {
                this.state = 'shoot';
                this.stateTimer = randInt(30, 60);
                faceNearest();
                this.vx = 0;
            } else if (r < 0.58) {
                this.state = 'melee';
                this.stateTimer = randInt(15, 25);
                faceNearest();
                this.vx = this.facing * 1.8;
            } else if (r < 0.72) {
                this.state = 'jump';
                this.stateTimer = 50;
                this.vy = rand(-6, -4);
                this.vx = rand(0.5, 1.5) * this.facing;
            } else if (r < 0.82) {
                this.state = 'dive';
                this.stateTimer = 40;
                this.vy = rand(-7, -5);
                this.vx = this.facing * rand(1.5, 3);
            } else if (r < 0.92) {
                this.state = 'grenade';
                this.stateTimer = 25;
                faceNearest();
                this.vx = 0;
            } else {
                this.state = 'idle';
                this.stateTimer = randInt(20, 40);
                this.vx = 0;
            }
        }

        // ─── Actions ───
        // Shooting
        if (this.state === 'shoot' && this.shootCooldown <= 0) {
            const bx = this.x + this.facing * 10;
            const by = this.y - 10;
            bullets.push(new Bullet(bx, by, this.facing * 4, 0, this.color));
            spawnMuzzleFlash(particles, bx, by, this.facing);
            this.shootCooldown = 8;
        }

        // Melee
        if (this.state === 'melee') {
            for (const f of fighters) {
                if (f === this || !f.alive) continue;
                if (Math.abs(f.x - this.x) < 18 && Math.abs(f.y - this.y) < 16) {
                    f.takeHit(2, this.facing, particles);
                }
            }
        }

        // Dive attack (when descending and near ground)
        if (this.state === 'dive' && this.vy > 2) {
            for (const f of fighters) {
                if (f === this || !f.alive) continue;
                if (Math.abs(f.x - this.x) < 16 && Math.abs(f.y - this.y) < 20) {
                    f.takeHit(3, this.facing, particles);
                    spawnExplosion(particles, f.x, f.y - 6, 0.6);
                }
            }
        }

        // Grenade throw
        if (this.state === 'grenade' && this.stateTimer === 20) {
            bullets.push(new Bullet(
                this.x + this.facing * 8, this.y - 16,
                this.facing * 3, -3.5, this.color, true
            ));
        }

        // Move
        this.x += this.vx;

        // Wrap
        if (this.x > this.canvasW + 30) this.x = -30;
        if (this.x < -30) this.x = this.canvasW + 30;
    }

    takeHit(dmg, knockDir, particles) {
        this.hp -= dmg;
        this.hitFlash = 8;
        this.state = 'hit';
        this.stateTimer = 12;
        this.vx = knockDir * 3;
        this.vy = -3;
        // Sparks from hit
        for (let i = 0; i < 5; i++) {
            particles.push(new Particle(
                this.x, this.y - 8,
                rand(-2, 2), rand(-3, 0),
                pick(C.spark), randInt(6, 14), rand(1, 3), 0.2, 0.94
            ));
        }
        if (this.hp <= 0) {
            this.alive = false;
            this.respawnTimer = randInt(90, 160);
            spawnExplosion(particles, this.x, this.y - 8, 1.5);
        }
    }

    findNearest(fighters) {
        let nearest = null, dist = Infinity;
        for (const f of fighters) {
            if (f === this || !f.alive) continue;
            const d = Math.abs(f.x - this.x);
            if (d < dist) { dist = d; nearest = f; }
        }
        return nearest;
    }

    draw(ctx) {
        if (!this.alive) return;
        const s = this.facing;
        const bx = Math.round(this.x);
        const by = Math.round(this.y);
        const bob = this.state === 'run' ? Math.sin(this.anim * 0.7) * 2 : 0;
        const col = this.hitFlash > 0 && this.hitFlash % 2 === 0 ? '#ffffff' : this.color;

        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.fillRect(bx - 5, this.groundY + 2, 10, 3);

        // ── Legs ──
        ctx.fillStyle = col;
        if (this.state === 'run') {
            const legA = Math.sin(this.anim * 1.0) * 4;
            ctx.fillRect(bx - 3, by - 5 + bob, 3, 6 + legA);
            ctx.fillRect(bx + 1, by - 5 + bob, 3, 6 - legA);
        } else if (this.state === 'dive' && !this.grounded) {
            // Legs forward
            ctx.fillRect(bx + s * 2, by - 3, s * 6, 3);
            ctx.fillRect(bx + s * 2, by - 1, s * 6, 3);
        } else if (this.state === 'jump' && !this.grounded) {
            // Legs tucked
            ctx.fillRect(bx - 3, by - 6, 3, 4);
            ctx.fillRect(bx + 1, by - 6, 3, 4);
        } else {
            ctx.fillRect(bx - 3, by - 5, 3, 6);
            ctx.fillRect(bx + 1, by - 5, 3, 6);
        }

        // ── Body ──
        ctx.fillStyle = col;
        ctx.fillRect(bx - 4, by - 16 + bob, 8, 11);

        // ── Head ──
        ctx.fillRect(bx - 3, by - 21 + bob, 7, 6);
        // Helmet line
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.fillRect(bx - 3, by - 21 + bob, 7, 2);

        // ── Eyes ──
        ctx.fillStyle = '#fff';
        ctx.fillRect(bx + (s > 0 ? 1 : -2), by - 19 + bob, 1, 2);
        ctx.fillRect(bx + (s > 0 ? 3 : 0), by - 19 + bob, 1, 2);

        // ── Arms / Weapons ──
        ctx.fillStyle = col;
        if (this.state === 'shoot') {
            // Gun extended
            ctx.fillRect(bx + s * 4, by - 14, s * 3, 3); // arm
            ctx.fillStyle = '#777';
            ctx.fillRect(bx + s * 7, by - 14, s * 8, 2); // gun barrel
            ctx.fillStyle = '#555';
            ctx.fillRect(bx + s * 6, by - 15, s * 3, 4); // gun body
        } else if (this.state === 'melee') {
            // Sword slash arc
            const slash = Math.sin(this.anim * 2.5);
            ctx.fillStyle = col;
            ctx.fillRect(bx + s * 4, by - 15, s * 3, 3);
            ctx.fillStyle = '#ccccee';
            ctx.fillRect(bx + s * 7, by - 20 + slash * 8, s * 10, 2);
            // Slash trail
            ctx.globalAlpha = 0.3;
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(bx + s * 7, by - 22 + slash * 8, s * 10, 6);
            ctx.globalAlpha = 1;
        } else if (this.state === 'dive' && !this.grounded) {
            // Fist forward
            ctx.fillRect(bx + s * 4, by - 14, s * 6, 3);
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(bx + s * 9, by - 14, s * 3, 3);
        } else if (this.state === 'grenade') {
            ctx.fillRect(bx + s * 4, by - 16, s * 4, 3);
            if (this.stateTimer > 18) {
                ctx.fillStyle = '#ff4400';
                ctx.fillRect(bx + s * 7, by - 18, 4, 4);
            }
        } else {
            ctx.fillRect(bx + s * 4, by - 13, s * 2, 4);
        }

        // ── HP bar ──
        if (this.hp < this.maxHp) {
            const barW = 16;
            const hpRatio = this.hp / this.maxHp;
            ctx.fillStyle = 'rgba(0,0,0,0.5)';
            ctx.fillRect(bx - barW / 2, by - 26 + bob, barW, 3);
            ctx.fillStyle = hpRatio > 0.5 ? '#33ff66' : hpRatio > 0.25 ? '#ffaa00' : '#ff3333';
            ctx.fillRect(bx - barW / 2, by - 26 + bob, barW * hpRatio, 3);
        }
    }
}

// ═══════════════════════════════════════
//  STARS
// ═══════════════════════════════════════
function genStars(w, h) {
    const stars = [];
    for (let i = 0; i < 100; i++) {
        stars.push({
            x: Math.random() * w,
            y: Math.random() * h * 0.55,
            size: Math.random() > 0.9 ? 2 : 1,
            phase: Math.random() * Math.PI * 2,
            speed: 0.01 + Math.random() * 0.03,
        });
    }
    return stars;
}

function drawStars(ctx, stars, frame) {
    for (const s of stars) {
        ctx.globalAlpha = 0.25 + 0.35 * Math.sin(s.phase + frame * s.speed);
        ctx.fillStyle = C.stars;
        ctx.fillRect(s.x, s.y, s.size, s.size);
    }
    ctx.globalAlpha = 1;
}

// ═══════════════════════════════════════
//  MAIN COMPONENT
// ═══════════════════════════════════════
export default function GameBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animId;
        let scrollX = 0;
        let frame = 0;
        let skyGradient;

        // Deep indigo/plum at the top fading through orange to an amber glow at the horizon.
        const buildSkyGradient = () => {
            const g = ctx.createLinearGradient(0, 0, 0, canvas.height);
            g.addColorStop(0, '#170f2e');
            g.addColorStop(0.35, '#4c1d95');
            g.addColorStop(0.65, '#c2410c');
            g.addColorStop(0.85, '#f97316');
            g.addColorStop(1, '#fbbf24');
            return g;
        };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            skyGradient = buildSkyGradient();
        };
        resize();
        window.addEventListener('resize', resize);

        // Listen for horizontal scroll event from App
        const onHScroll = (e) => { scrollX = e.detail?.scrollLeft || 0; };
        window.addEventListener('hscroll', onHScroll);

        // ─── World ───
        const buildings = generateBuildings(canvas.width + 2000);
        const stars = genStars(canvas.width, canvas.height);
        const groundY = canvas.height - 40;

        // ─── Fighters (6 of them for more chaos) ───
        const fColors = [C.f1, C.f2, C.f3, C.f4, C.f5, C.f6];
        const fighters = fColors.map((c, i) =>
            new Fighter(80 + i * 180 + rand(0, 80), groundY, c, canvas.width)
        );

        let bullets = [];
        let particles = [];

        // ─── Grenade collisions ───
        function checkBulletHits() {
            for (let i = bullets.length - 1; i >= 0; i--) {
                const b = bullets[i];
                // Grenade ground hit
                if (b.isGrenade && b.y >= groundY) {
                    spawnExplosion(particles, b.x, b.y, 2.0);
                    // Damage nearby fighters
                    for (const f of fighters) {
                        if (!f.alive) continue;
                        if (Math.abs(f.x - b.x) < 40 && Math.abs(f.y - b.y) < 30) {
                            f.takeHit(3, f.x > b.x ? 1 : -1, particles);
                        }
                    }
                    bullets.splice(i, 1);
                    continue;
                }
                // Bullet → fighter
                if (!b.isGrenade) {
                    for (const f of fighters) {
                        if (!f.alive || f.color === b.owner) continue;
                        if (Math.abs(b.x - f.x) < 10 && Math.abs(b.y - (f.y - 10)) < 12) {
                            f.takeHit(1, b.vx > 0 ? 1 : -1, particles);
                            spawnExplosion(particles, b.x, b.y, 0.4);
                            bullets.splice(i, 1);
                            break;
                        }
                    }
                }
            }
        }

        // ─── Draw ground ───
        function drawGround() {
            ctx.fillStyle = C.ground;
            ctx.fillRect(0, groundY + 2, canvas.width, canvas.height - groundY);
            ctx.fillStyle = C.groundLine;
            ctx.fillRect(0, groundY, canvas.width, 2);
            // Ground detail lines
            ctx.fillStyle = 'rgba(255,255,255,0.02)';
            for (let gx = 0; gx < canvas.width; gx += randInt(30, 60)) {
                ctx.fillRect(gx, groundY + 4, randInt(10, 30), 1);
            }
        }

        // ─── Main loop ───
        function loop() {
            frame++;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Sky
            ctx.fillStyle = skyGradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            drawStars(ctx, stars, frame);
            drawBuildings(ctx, buildings, canvas.height, scrollX, frame);
            drawGround();

            // Update & draw fighters
            for (const f of fighters) {
                f.update(fighters, bullets, particles);
                f.draw(ctx);
            }

            // Update & draw bullets
            for (let i = bullets.length - 1; i >= 0; i--) {
                bullets[i].update();
                bullets[i].draw(ctx);
                if (!bullets[i].alive || bullets[i].x < -60 || bullets[i].x > canvas.width + 60) {
                    bullets.splice(i, 1);
                }
            }

            checkBulletHits();

            // Update & draw particles
            for (let i = particles.length - 1; i >= 0; i--) {
                particles[i].update();
                particles[i].draw(ctx);
                if (!particles[i].alive) particles.splice(i, 1);
            }

            // Cap arrays to prevent memory buildup
            if (bullets.length > 100) bullets.splice(0, bullets.length - 100);
            if (particles.length > 500) particles.splice(0, particles.length - 500);

            animId = requestAnimationFrame(loop);
        }

        loop();

        const onVisibilityChange = () => {
            if (document.hidden) {
                cancelAnimationFrame(animId);
            } else {
                loop();
            }
        };
        document.addEventListener('visibilitychange', onVisibilityChange);

        return () => {
            cancelAnimationFrame(animId);
            document.removeEventListener('visibilitychange', onVisibilityChange);
            window.removeEventListener('resize', resize);
            window.removeEventListener('hscroll', onHScroll);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            id="game-background"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 0,
                pointerEvents: 'none',
                opacity: 0.22,
            }}
        />
    );
}
