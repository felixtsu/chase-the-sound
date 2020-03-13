// Add your code here
namespace phrasetwo {

    class TrialStatue {
        vx: number
        vy: number
        melodies: music.Melody[] = []
        spriteKind: number
        location: tiles.Location
        sprite: Sprite
        playing = false

        constructor(vx: number, vy: number, location: tiles.Location, tones: string[], spriteKind: number) {
            this.vx = vx
            this.vy = vy
            this.location = location
            this.spriteKind = spriteKind
            tones.forEach((tone: string, index: number) => {
                this.melodies.push(new music.Melody(tone))
            })
        }

        show() {
            this.sprite = sprites.create(img`
                . . . . . . . . . . . . . . . .
                . . . . . . . 1 1 1 . . . . . .
                . . . . . . 1 3 3 3 . . . . . .
                . . . . . . 1 3 1 1 . . . . . .
                . . . . . . 3 1 1 1 . . . . . .
                . . . . . . 3 b 1 3 1 . . . . .
                . . . . . . b 3 b 3 1 1 . . . .
                . . . . . . 3 1 3 1 3 1 . . . .
                . . . . . b 3 1 3 1 b 1 . . . .
                . . . . . b 3 3 3 1 1 3 . . . .
                . . . . . b c 3 1 3 1 1 . . . .
                . . . . 3 b c 3 1 1 3 1 . . . .
                . . . . 3 b c 1 1 1 1 . . . . .
                . . . . 3 c 3 1 1 1 1 . . . . .
                . . . 3 3 c 1 1 1 1 1 3 . . . .
                . . . 1 b 3 1 1 1 1 1 1 . . . .
                . . . . . 3 1 1 1 1 1 1 . . . .
                . . . . . 3 1 1 3 1 1 1 . . . .
                . . . . . 3 1 1 3 1 1 1 3 . . .
                . b b b b 3 1 1 3 1 1 1 1 b b .
                b 1 1 1 3 3 1 3 3 1 1 1 1 3 1 b
                3 1 1 3 1 3 1 3 3 1 1 3 1 3 1 3
                3 1 1 3 1 1 1 3 3 1 1 3 3 3 1 3
                3 1 1 1 3 1 1 3 3 1 1 3 3 1 1 3
                3 1 1 1 1 3 3 3 3 3 3 3 3 1 1 3
                3 1 1 1 1 1 3 3 3 3 3 1 1 1 1 3
                b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b
                3 b b 1 1 1 1 1 1 1 1 1 1 b b 3
                1 3 3 3 3 3 3 3 3 3 3 3 3 3 3 1
                1 3 3 3 3 b b b b b b 3 3 3 3 1
                b 3 3 3 3 3 3 3 3 3 3 3 3 3 3 b
                c b b b b b b b b b b b b b b c
            `, this.spriteKind)
            this.sprite.setFlag(SpriteFlag.Ghost, true)
            let location: tiles.Location = tiles.getTileLocation(7, 7)
            tiles.placeOnTile(this.sprite, location)
            scene.cameraFollowSprite(this.sprite)
            pause(500)

            this.play()

            this.sprite.vx = this.vx
            this.sprite.vy = this.vy
            pauseUntil(() => {
                return Math.abs(this.sprite.x - this.location.x) < 5
            })
            this.sprite.vx = 0
            this.sprite.vy = 0

            pause(200)
            this.sprite.setFlag(SpriteFlag.Ghost, false)
            this.stop()
        }

        destroy() {
            this.sprite.destroy()
        }

        play() {
            if (this.playing) {
                return
            }
            this.playing = true
            this.melodies.forEach(function (tone: music.Melody, index: number) {
                tone.loop()
            })
        }

        stop() {
            this.playing = false
            this.melodies.forEach(function (tone: music.Melody, index: number) {
                tone.stop()
            })
        }
    }

    class StatueSetting {
        tones: string[]
        spriteKind: number
        constructor(tones: string[], spriteKind: number) {
            this.tones = tones
            this.spriteKind = spriteKind
        }
    }

    let candidate: StatueSetting[]
    let statues: TrialStatue[] = []

    function clearScene() {
        disablePlayerControl()
        statues.forEach((statue:TrialStatue, index:number) => {
            scene.cameraFollowSprite(statue.sprite)
            statue.destroy()
        })
    }

    function initTrialStatueSettings() {
        candidate = [
            new StatueSetting(["C~3", "G~3"], SpriteKind.TrueStatue),
            new StatueSetting(["C~3", "D~3"], SpriteKind.FakeStatue),
            new StatueSetting(["C~3", "D#~3"], SpriteKind.FakeStatue),
            new StatueSetting(["C~3", "Db~3"], SpriteKind.FakeStatue),
        ]
    }

    export function prepareConsonantTrial() {
        pause(200)

        scene.cameraFollowSprite(statue)
        for (let i = 0; i <= 10; i++) {
            if (i % 2 == 0) {
                statue.setImage(img`
                    . . . . . . . . . . . . . . . .
                    . . . . . . . 1 1 1 . . . . . .
                    . . . . . . 1 3 3 3 . . . . . .
                    . . . . . . 1 3 1 1 . . . . . .
                    . . . . . . 3 1 1 1 . . . . . .
                    . . . . . . 3 b 1 3 1 . . . . .
                    . . . . . . b 3 b 3 1 1 . . . .
                    . . . . . . 3 1 3 1 3 1 . . . .
                    . . . . . b 3 1 3 1 b 1 . . . .
                    . . . . . b 3 3 3 1 1 3 . . . .
                    . . . . . b c 3 1 3 1 1 . . . .
                    . . . . 3 b c 3 1 1 3 1 . . . .
                    . . . . 3 b c 1 1 1 1 . . . . .
                    . . . . 3 c 3 1 1 1 1 . . . . .
                    . . . 3 3 c 1 1 1 1 1 3 . . . .
                    . . . 1 b 3 1 1 1 1 1 1 . . . .
                    . . . . . 3 1 1 1 1 1 1 . . . .
                    . . . . . 3 1 1 3 1 1 1 . . . .
                    . . . . . 3 1 1 3 1 1 1 3 . . .
                    . b b b b 3 1 1 3 1 1 1 1 b b .
                    b 1 1 1 3 3 1 3 3 1 1 1 1 3 1 b
                    3 1 1 3 1 3 1 3 3 1 1 3 1 3 1 3
                    3 1 1 3 1 1 1 3 3 1 1 3 3 3 1 3
                    3 1 1 1 3 1 1 3 3 1 1 3 3 1 1 3
                    3 1 1 1 1 3 3 3 3 3 3 3 3 1 1 3
                    3 1 1 1 1 1 3 3 3 3 3 1 1 1 1 3
                    b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b
                    3 b b 1 1 1 1 1 1 1 1 1 1 b b 3
                    1 3 3 3 3 3 3 3 3 3 3 3 3 3 3 1
                    1 3 3 3 3 b b b b b b 3 3 3 3 1
                    b 3 3 3 3 3 3 3 3 3 3 3 3 3 3 b
                    c b b b b b b b b b b b b b b c
                `)
            } else {
                statue.setImage(img`
                    . . . . . . . . . . . . . . . .
                    . . . . . . . d d d . . . . . .
                    . . . . . . d b b b . . . . . .
                    . . . . . . d b d d . . . . . .
                    . . . . . . b d d d . . . . . .
                    . . . . . . b c d b d . . . . .
                    . . . . . . c b c b d d . . . .
                    . . . . . . b d b d b d . . . .
                    . . . . . c b d b d c d . . . .
                    . . . . . c b b b d d b . . . .
                    . . . . . c f b d b d d . . . .
                    . . . . b c f b d d b d . . . .
                    . . . . b c f d d d d . . . . .
                    . . . . b f b d d d d . . . . .
                    . . . b b f d d d d d b . . . .
                    . . . d c b d d d d d d . . . .
                    . . . . . b d d d d d d . . . .
                    . . . . . b d d b d d d . . . .
                    . . . . . b d d b d d d b . . .
                    . c c c c b d d b d d d d c c .
                    c d d d b b d b b d d d d b d c
                    b d d b d b d b b d d b d b d b
                    b d d b d d d b b d d b b b d b
                    b d d d b d d b b d d b b d d b
                    b d d d d b b b b b b b b d d b
                    b d d d d d b b b b b d d d d b
                    c d d d d d d d d d d d d d d c
                    b c c d d d d d d d d d d c c b
                    d b b b b b b b b b b b b b b d
                    d b b b b c c c c c c b b b b d
                    c b b b b b b b b b b b b b b c
                    f c c c c c c c c c c c c c c f
                `)
            }
            pause(100)
        }
        pause(1000)

        game.splash("You are here.")
        game.splash("Now, listen, the sound will once again guide you.")

        initTrialStatueSettings()
        for (let index = 0; index < 4; index++) {
            if (index == 3) {
                statue.destroy()
            }
            let statueParam = Math.pickRandom(candidate)
            candidate.removeElement(statueParam)
            let trialStatue = new TrialStatue(index % 2 == 0 ? -30 : 30, index < 2 ? -30 : 30,
                tiles.getTileLocation(index % 2 == 0 ? 3 : 11, index < 2 ? 3 : 10),
                statueParam.tones, statueParam.spriteKind);
            statues.push(trialStatue)
            trialStatue.show()
        }

        sprites.onOverlap(SpriteKind.Player, SpriteKind.TrueStatue, function (sprite: Sprite, otherSprite: Sprite) {
            const ordeOfHappiness = new music.Melody("E:4 E:4 F:4 G:4 G:4 F:4 E:4 D:4 C:4 C:4 D:4 E:4 D:6 C:2 C:4")
            game.setGameOverSound(true, ordeOfHappiness)

            game.splash("Goddess:You have found me.")
            music.stopAllSounds()
            music.setVolume(90)
            game.over(true)
        })

        sprites.onOverlap(SpriteKind.Player, SpriteKind.FakeStatue, function (sprite: Sprite, otherSprite: Sprite) {
            game.splash("Goddess:Harmony will guide you.")

            //TODO shuffle the statues, restart again
            // game.splash("Goddess:Find me, the true me.")
        })

        registerSoundHandler(function () {
            //1. find nearest statue
            let nearestIndex = 0, nearestDistance = 9999999999
            statues.forEach( (statue: TrialStatue, index: number) => {
                let distance = (hero.x - statue.sprite.x) **2 + (hero.y - statue.sprite.y)**2
                if (distance < nearestDistance) {
                    nearestDistance = distance
                    nearestIndex = index
                }
            })
            //2. stop not nearest statue
            statues.forEach(function (statue: TrialStatue, index: number) {
                if(index != nearestIndex) {
                    statue.stop()
                }
            })
            //3. set volume by distance 
            let volume = Math.abs(4096 - nearestDistance )/ 4096 * 90
            music.setVolume(volume)
            statues[nearestIndex].play()
        })

        scene.cameraFollowSprite(hero)

    }
}