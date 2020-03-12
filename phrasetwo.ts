// Add your code here
namespace phrasetwo {

    class TrialStatue {
        vx: number
        vy: number
        melodies: music.Melody[] = []
        spriteKind: number
        loaction: tiles.Location

        constructor(vx: number, vy: number, location: tiles.Location, tones: string[], spriteKind: number) {
            this.vx = vx
            this.vy = vy
            this.loaction = location
            this.spriteKind = spriteKind
            tones.forEach((tone: string, index: number) => {
                this.melodies.push(new music.Melody(tone))
            })
        }

        show() {
            let statueSprite = sprites.create(img`
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
            statueSprite.setFlag(SpriteFlag.Ghost, true)
            let location: tiles.Location = tiles.getTileLocation(7, 7)
            tiles.placeOnTile(statueSprite, location)
            scene.cameraFollowSprite(statueSprite)
            console.log(statueSprite.x)
            console.log(statueSprite.y)
            console.log(scene.cameraLeft)
            console.log(scene.cameraTop)
            pause(500)


            this.play()

            statueSprite.vx = this.vx
            statueSprite.vy = this.vy
            pauseUntil(() => {
                return Math.abs(statueSprite.x - this.loaction.x) < 5
            })
            statueSprite.vx = 0
            statueSprite.vy = 0

            pause(200)
            statueSprite.setFlag(SpriteFlag.Ghost, false)
            this.stop()
        }

        play() {
            this.melodies.forEach(function (tone: music.Melody, index: number) {
                tone.loop()
            })
        }

        stop() {
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

    export function init() {
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

        for (let index = 0; index < 4; index++) {
            if (index == 3) {
                statue.destroy()
            }
            let statueParam = Math.pickRandom(candidate)
            candidate.removeElement(statueParam)
            new TrialStatue(index % 2 == 0 ? -30 : 30, index < 2 ? -30 : 30,
                tiles.getTileLocation(index % 2 == 0 ? 3 : 11, index < 2 ? 3 : 10), 
                statueParam.tones, statueParam.spriteKind).show()
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
        })

        scene.cameraFollowSprite(hero)

    }
}