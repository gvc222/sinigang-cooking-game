import * as Phaser from 'phaser';

export class SceneUtils {
    static loadUi(scene: Phaser.Scene) {
        scene.load.image('button-start-hover', 'assets/button-start-hover.png'),
        scene.load.image('button-wait', 'assets/button-wait.png')
        // Add more UI images here
    }

    static loadBackground(scene: Phaser.Scene) {
        scene.load.image('background', 'assets/bg-blur.png')
    }

    static addNavigation(scene: Phaser.Scene) {
        // this.addBackButton(scene);
        this.addWaitButton(scene);
        // create more buttons (add wait button, add stir button, etc)
        // you will define them in the following section
    }

    private static addWaitButton(scene: Phaser.Scene) {
        const waitButton = scene.add.image(500, 500, 'button-wait').setInteractive().setDepth(3);
        // Can add scale with setScale(1, 1) for 100%
        scene.add.text(50, 35, 'Wait').setDepth(4)
        // setDepth is the z-index
        waitButton.on('pointerdown', () => {
            // Set a wait time here to move to the next
            setTimeout(function() {
                console.log("This message is displayed after 2 seconds");
                }, 2000);
            // return scene.scene.start("Kitchen")
        })
    }

    // Can probably add hover states to these buttons, by changing the image on hover
}