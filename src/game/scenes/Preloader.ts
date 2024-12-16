import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        //  We loaded this image in our Boot Scene, so we can display it here
        this.add.image(512, 384, 'background');

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress: number) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
    }

    preload ()
    {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');

        this.load.image('logo', 'logo.png');
        this.load.image('star', 'star.png');
        // this.load.image('background', 'bg-blur.png');
        this.load.image('background', 'bg.png');
        this.load.image('button-start-hover', 'button-start-hover.png');
        this.load.image('button-start', 'button-start.png');
        this.load.image('button-stove-off-hover', 'button-stove-off-hover.png');
        this.load.image('button-stove-off', 'button-stove-off.png');
        this.load.image('button-stove-on-hover', 'button-stove-on-hover.png');
        this.load.image('button-stove-on', 'button-stove-on.png');
        this.load.image('button-wait-hover', 'button-wait-hover.png');
        this.load.image('button-wait', 'button-wait.png');
        this.load.image('card-add-fire', 'card-add-fire.png');
        this.load.image('card-add-water', 'card-add-water.png');
        this.load.image('card-cover', 'card-cover.png');
        this.load.image('card-meat', 'card-meat.png');
        this.load.image('card-ong-choy', 'card-ong-choy.png');
        this.load.image('card-onion', 'card-onion.png');
        this.load.image('card-remove-fire', 'card-remove-fire.png');
        this.load.image('card-soup-mix', 'card-soup-mix.png');
        this.load.image('card-stir', 'card-stir.png');
        this.load.image('card-taro', 'card-taro.png');
        this.load.image('card-tomato', 'card-tomato.png');
        this.load.image('card-uncover', 'card-uncover.png');
        this.load.image('card-wait', 'card-wait.png');
        this.load.image('how-to-cook', 'how-to-cook.png');
        this.load.image('ladle', 'ladle.png');
        this.load.image('pot-cover', 'pot-cover.png');
        this.load.image('pot-meat-in', 'pot-meat-in.png');
        this.load.image('pot-taro-in', 'pot-taro-in.png');
        this.load.image('pot-tomato-in', 'pot-tomato-in.png');
        this.load.image('pot-tomato-onion-in', 'pot-tomato-onion-in.png');
        this.load.image('pot-water-in', 'pot-water-in.png');
        this.load.image('sinigang', 'sinigang.png');
        this.load.image('tabletop', 'tabletop.png');
        this.load.image('header-box', 'header-box.png');
        this.load.image('pot', 'pot.png');
        this.load.image('stove', 'stove.png');
        this.load.image('fire', 'fire.png');
        this.load.image('pot-covered', 'pot-covered.png');
        this.load.image('pot-sinigang', 'pot-sinigang.png');
        this.load.image('pot-meat-in-cooked', 'pot-meat-in-cooked.png');
        this.load.image('pot-sinigang-ong-choy', 'pot-sinigang-ong-choy.png');
        this.load.image('pot-sinigang-ong-choy-cooked', 'pot-sinigang-ong-choy-cooked.png');
    }

    create ()
    {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('MainMenu'); //should be MainMenu
    }
}
