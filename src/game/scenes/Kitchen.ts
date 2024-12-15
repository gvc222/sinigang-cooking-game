import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
// import { SceneUtils } from '../utils/SceneUtils';
import { CookingStepsManager } from '../data/CookingStepsManager';

export class Kitchen extends Scene {
    private cookingStepsManager: CookingStepsManager;
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    private kitchenText: Phaser.GameObjects.Text;
    
    // Card references
    private imageArray: Phaser.GameObjects.Image[] = []

    constructor () {
        super('Kitchen');
    }

    // Progress tracking
    private progress: number = 0;
    private cardList = [
        "card-add-fire.png",
        "card-add-water.png",
        "card-cover.png",
        "card-meat.png",
        "card-ong-choy.png",
        "card-onion.png",
        "card-remove-fire.png",
        "card-soup-mix.png",
        "card-stir.png",
        "card-taro.png",
        "card-tomato.png",
        "card-uncover.png",
        "card-wait.png"
    ]

    preload() {
        this.cookingStepsManager = new CookingStepsManager(this);
        this.cookingStepsManager.loadSteps();

        // Wait for loader to complete
        this.load.once('complete', () => {
            this.cookingStepsManager.processData();
            console.log("Steps loaded successfully:", this.cookingStepsManager.steps)
        })
    }
    
    create () {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x4B2C25);

        // background image
        this.background = this.add.image(1024/2, 486/2, 'background');
        this.background.setAlpha(1);

        // display header box
        this.add.image(512, 74/2, 'header-box')

        // display tabletop
        this.add.image(512, 486+140, 'tabletop')

        // display stove
        this.add.image(512, 486 + 80, 'stove')
        
        // display pot
        this.add.image(512, 435, 'pot')

        // display cards on the left
        // this.cards = [
        //     this.add.image(103, 227, ''),
        //     this.add.image(103, 227+164, ''),
        //     this.add.image(103, 227+164+164, '')
        // ]
        

        // creating a blank text to display steps
        this.kitchenText = this.add.text(100, 38, '', {
            fontFamily: 'Arial', fontSize: 18, color: '#ffffff',
            align: 'left'
        }).setOrigin(0.5).setDepth(100);

        // set the steps text
        this.cookingStepsManager.processData();
        // change to let instead of const later when changing cookingStepsData
        // const cookingStepsData = this.cookingStepsManager.steps;
        // // Progress number or number of step
        // let progress = 1 // 1 for now, to test
        // if (cookingStepsData && Array.isArray(cookingStepsData)) {
        //     let displayedText = this.cookingStepsManager.steps.find(s => s.step === progress)
        //     if (displayedText) {
        //         this.kitchenText.setText(displayedText.description)
        //     }
        // }

        // Initial step setup
        this.setupStep()
        // this.setupCardsForStep();

        EventBus.emit('current-scene-ready', this);
    }

    setupStep() {
        // Clear previous cards
        // this.cards.forEach(card => card.destroy());
        // this.cards = [];

        // Get current step description
        const currentStepData = this.cookingStepsManager.steps.find(s => s.step === this.progress + 1);
        console.log("currentStepData", currentStepData)
        if (currentStepData) {
            this.kitchenText.setText(currentStepData.description);
        }

        // Setup cards for current step
        this.setupCardsForStep();
    }

    setupCardsForStep() {
        const currentStep = this.cookingStepsManager.steps.find(s => s.step === this.progress + 1)
        if (!currentStep) return

        const correctAnswer = currentStep.answer;
        // debugging only
        // console.log("Current Step", currentStep);
        // console.log("Correct Answer", correctAnswer);
        
        // Get all available card images
        const allCardImages = this.getAllCardImages();
        
        const image1 = this.add.image(103, 227, `${image}`);
        const image2 = this.add.image(103, 227+164, `${image}`);
        const image3 = this.add.image(103, 227+164+164, `${image}`);
        this.imageArray = [ image1, image2, image3 ]

        
        const availableImages = allCardImages.filter(image => 
            image !== correctAnswer
        )
        
        const wrongAnswers = this.getRandomItems(availableImages, 2);
        // debugging only
        console.log("Wrong Answers:", wrongAnswers)
        
        // Combine correct and wrong answers
        const cardImages = [correctAnswer, ...wrongAnswers];
        console.log("cardImages", cardImages)

        // Shuffle card images
        this.shuffleArray(cardImages)
        console.log("Final Card Images:", cardImages);

        // Update existing card images
        this.imageArray.forEach((image, index) => {
            
            // remove any existing interactive events
            image.removeInteractive();

            // Update texture
            const texture = cardImages[index];
            console.log(`Setting card ${index} to texture:`, cardImages[index])

            
            // Make interactive and add click handler
            image.setInteractive();
            image.on('pointerdown', () => {
                if (cardImages[index] === correctAnswer) {
                    this.handleCorrectChoice();
                } else {
                    this.handleWrongChoice();
                }
            })
        }
        )
    }

    // Prepare an array of all possible card images
    private getRandomItems(arr: string[], count: number): string[] {
        const shuffled = [...arr].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count)
    }

    private shuffleArray(array: string[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j],array[i]];
        }
    }
    
    private getAllCardImages(): string[] {
        return this.cardList
    }

    private handleCorrectChoice() {
        console.log("Correct Answer!")
        this.progress += 1;
        this.setupStep();
    }

    private handleWrongChoice() {
        console.log("Wrong Choice")
    }

    changeScene ()
    {
        this.scene.start('Kitchen');
    }
}
