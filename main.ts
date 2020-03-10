namespace SpriteKind {
    export const DarkStatue = SpriteKind.create()
    export const LightStatue = SpriteKind.create()
}
namespace myTiles {
    //% blockIdentity=images._tile
    export const tile0 = img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.DarkStatue, function (sprite, otherSprite) {
    game.splash("The statue is dark and gloomy.")
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.stairSouth, function (sprite, location) {
    enterDoor(sprite, location, "S")
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.stairNorth, function (sprite, location) {
    enterDoor(sprite, location, "N")
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.stairWest, function (sprite, location) {
    enterDoor(sprite, location, "W")
})
function genRandomSequence() {
    exitCandiate = ["E", "S", "W"]
    exitSequence.push("N")
    for (let i = 1; i < 8; i++) {
        let candidate: string = Math.pickRandom(exitCandiate)
        exitSequence.push(candidate)
        exitCandiate.removeElement(candidate)
        exitCandiate.push(exitSequence[i - 1])
    }
}
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.stairEast, function (sprite, location) {
    enterDoor(sprite, location, "E")
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.LightStatue, function (sprite, otherSprite) {
    game.splash("You have found me.")
    music.stopAllSounds()
    music.setVolume(90)
    ordeOfHappiness.playUntilDone()
    game.over(true)
})
let volume = 0
let distance = 0
let nextExit: tiles.Location = null
let exitSequence: string[] = []
let currentRoomIndex = 0
let exitCandiate: string[] = []
function omitOverlap(sprite: Sprite, location: tiles.Location) {
    if (Math.abs(location.x - sprite.x) > 16 || Math.abs(location.y - sprite.y) > 16) {
        return true;
    }
    return false;
}
function getOppositeLocation(side: String) {
    if (side == "N") {
        return tiles.getTileLocation(7, 13)
    } else if (side == "S") {
        return tiles.getTileLocation(7, 1)
    } else if (side == "W") {
        return tiles.getTileLocation(13, 7)
    } else {
        return tiles.getTileLocation(1, 7)
    }
}
function getExitLocation(side: String) {
    if (side == "N") {
        return tiles.getTileLocation(7, 0)
    } else if (side == "S") {
        return tiles.getTileLocation(7, 14)
    } else if (side == "W") {
        return tiles.getTileLocation(0, 7)
    } else {
        return tiles.getTileLocation(14, 7)
    }
}

const texts = [
    "Another room, not supposed to be like this.",
    "Another room again?",
    "Again?",
    "No, I am returning to the SAME room!",
    "What's that sound?",
    "I MUST follow that sound."
]

let splashTick = false;
let splashText = "";
function wanderingInSilence() {
    if (traversedRoom == 4) {
        music.ringTone(octave[currentRoomIndex])
    }
    splashTick = true
}

game.onPaint(function () {
    if (splashTick) {
        game.splash(splashText)
    }
    splashTick = false
})

let traversedRoom = 0
function enterDoor(sprite: Sprite, location: tiles.Location, side: string) {
    if (!omitOverlap(sprite, location)) {
        let targetLocation: tiles.Location = getOppositeLocation(side)
        tiles.placeOnTile(sprite, targetLocation)
        if (traversedRoom < texts.length) {
            wanderingInSilence()
            splashText = texts[traversedRoom]
            traversedRoom += 1
            return
        } else {
            if (side == exitSequence[currentRoomIndex]) {
                currentRoomIndex += 1
            } else {
                currentRoomIndex = 0
                scene.cameraShake(5, 500)
                game.showLongText("The sound, I MUST follow the sound.", DialogLayout.Bottom)
            }
            music.ringTone(octave[currentRoomIndex])
            if (currentRoomIndex == 7) {
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
                statue.setKind(SpriteKind.LightStatue)
            }
        }
    }
}

const ordeOfHappiness = new music.Melody("E:4 E:4 F:4 G:4 G:4 F:4 E:4 D:4 C:4 C:4 D:4 E:4 D:6 C:2 C:4")
let statue = sprites.create(img`
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
`, SpriteKind.DarkStatue)
let octave = [262, 294, 330, 349, 392, 440, 494, 523]
let hero = sprites.create(img`
    . . . . . f f 4 4 f f . . . . .
    . . . . f 5 4 5 5 4 5 f . . . .
    . . . f e 4 5 5 5 5 4 e f . . .
    . . f b 3 e 4 4 4 4 e 3 b f . .
    . . f 3 3 3 3 3 3 3 3 3 3 f . .
    . f 3 3 e b 3 e e 3 b e 3 3 f .
    . f 3 3 f f e e e e f f 3 3 f .
    . f b b f b f e e f b f b b f .
    . f b b e 1 f 4 4 f 1 e b b f .
    f f b b f 4 4 4 4 4 4 f b b f f
    f b b f f f e e e e f f f b b f
    . f e e f b d d d d b f e e f .
    . . e 4 c d d d d d d c 4 e . .
    . . e f b d b d b d b b f e . .
    . . . f f 1 d 1 d 1 d f f . . .
    . . . . . f f b b f f . . . . .
`, SpriteKind.Player)
let soundStartCountDown = 3
controller.moveSprite(hero)
tiles.setTilemap(tiles.createTilemap(
    hex`0f000f001115151c1515150a1515151c151518130f0f0f0f0f0f0f0f0f0f0f0f0f14130f0f0f0f0f0f0f0f0f0f0f0f0f141b0f0f0f0f0f0f0f0f0f0f0f0f0f19130f0f0f0f0f0f0f0f0f0f0f0f0f14130f0f0f0f0f0f0f0f0f0f0f0f0f14130f0f0f0f0f0f0f0f0f0f0f0f0f140b0f0f0f0f0f0f0f0f0f0f0f0f0f0c130f0f0f0f0f0f0f0f0f0f0f0f0f14130f0f0f0f0f0f0f0f0f0f0f0f0f14130f0f0f0f0f0f0f0f0f0f0f0f0f141b0f0f0f0f0f0f0f0f0f0f0f0f0f19130f0f0f0f0f0f0f0f0f0f0f0f0f14130f0f0f0f0f0f0f0f0f0f0f0f0f141216161a161616091616161a161617`,
    img`
        2 2 2 2 2 2 2 . 2 2 2 2 2 2 2
        2 . . . . . . . . . . . . . 2
        2 . . . . . . . . . . . . . 2
        2 . . . . . . . . . . . . . 2
        2 . . . . . . . . . . . . . 2
        2 . . . . . . . . . . . . . 2
        2 . . . . . . . . . . . . . 2
        . . . . . . . . . . . . . . .
        2 . . . . . . . . . . . . . 2
        2 . . . . . . . . . . . . . 2
        2 . . . . . . . . . . . . . 2
        2 . . . . . . . . . . . . . 2
        2 . . . . . . . . . . . . . 2
        2 . . . . . . . . . . . . . 2
        2 2 2 2 2 2 2 . 2 2 2 2 2 2 2
    `,
    [myTiles.tile0, sprites.dungeon.darkGroundNorthWest0, sprites.dungeon.darkGroundNorthEast0, sprites.dungeon.darkGroundSouthWest0, sprites.dungeon.darkGroundSouthEast0, sprites.dungeon.darkGroundWest, sprites.dungeon.darkGroundNorth, sprites.dungeon.darkGroundEast, sprites.dungeon.darkGroundSouth, sprites.dungeon.stairSouth, sprites.dungeon.stairNorth, sprites.dungeon.stairWest, sprites.dungeon.stairEast, sprites.dungeon.darkGroundNorthWest1, sprites.dungeon.hazardHole, sprites.dungeon.darkGroundCenter, sprites.dungeon.purpleInnerNorthEast, sprites.dungeon.purpleOuterNorthWest, sprites.dungeon.purpleOuterSouthEast, sprites.dungeon.purpleOuterWest0, sprites.dungeon.purpleOuterEast0, sprites.dungeon.purpleOuterNorth1, sprites.dungeon.purpleOuterSouth1, sprites.dungeon.purpleOuterSouthWest, sprites.dungeon.purpleOuterNorthEast, sprites.dungeon.purpleOuterEast2, sprites.dungeon.purpleOuterSouth2, sprites.dungeon.purpleOuterWest2, sprites.dungeon.purpleOuterNorth2],
    TileScale.Sixteen
))
tiles.placeOnTile(statue, tiles.getTileLocation(7, 7))
tiles.placeOnTile(hero, tiles.getTileLocation(7, 9))
scene.cameraFollowSprite(hero)
genRandomSequence()
pause(1000)
game.splash("Where am i?")
game.onUpdateInterval(100, function () {
    let target: tiles.Location
    if (currentRoomIndex == 7) {
        target = tiles.getTileLocation(7, 7)
    } else {
        target = getExitLocation(exitSequence[currentRoomIndex])
    }
    distance = Math.sqrt((target.x - hero.x) ** 2 + (target.y - hero.y) ** 2) / 16
    volume = 10 + (15 - distance) ** 3 / 2744 * 85
    console.log(volume)
    music.setVolume(volume)
})
