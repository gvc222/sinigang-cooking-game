import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class MainMenu extends Scene
{
    background: GameObjects.Image;
    title: GameObjects.Text;
    logoTween: Phaser.Tweens.Tween | null;

    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        // Add subheader
        this.add.image(512, 175, 'how-to-cook')
        // Add header
        this.add.image(512, 300, 'sinigang')

        // Add a button
        const startButton = this.add.image(512, 600, 'button-start').setInteractive();
        // Add hover state
    //     startButton.on('pointerover', () => {
    //         startButton = this.add.image(512, 400, 'button-start-hover').setInteractive()
    // })
        startButton.on('pointerdown', () => {this.scene.start('Kitchen')})
        EventBus.emit('current-scene-ready', this);
    }
    
    // changeScene ()
    // {
    //     if (this.logoTween)
    //     {
    //         this.logoTween.stop();
    //         this.logoTween = null;
    //     }

    //     this.scene.start('Game');
    // }

    // moveLogo (vueCallback: ({ x, y }: { x: number, y: number }) => void)
    // {
    //     if (this.logoTween)
    //     {
    //         if (this.logoTween.isPlaying())
    //         {
    //             this.logoTween.pause();
    //         }
    //         else
    //         {
    //             this.logoTween.play();
    //         }
    //     } 
    //     else
    //     {
    //         this.logoTween = this.tweens.add({
    //             targets: this.logo,
    //             x: { value: 750, duration: 3000, ease: 'Back.easeInOut' },
    //             y: { value: 80, duration: 1500, ease: 'Sine.easeOut' },
    //             yoyo: true,
    //             repeat: -1,
    //             onUpdate: () => {
    //                 if (vueCallback)
    //                 {
    //                     vueCallback({
    //                         x: Math.floor(this.logo.x),
    //                         y: Math.floor(this.logo.y)
    //                     });
    //                 }
    //             }
    //         });
    //     }
    // }
}
