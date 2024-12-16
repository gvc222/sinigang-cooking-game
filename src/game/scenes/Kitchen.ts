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
    private cardImages: Phaser.GameObjects.Image[] = []
    cooktop: any;
    currentStepData: any;
    fire: any;

    constructor () {
        super('Kitchen');
    }

    // Progress tracking
    private progress: number = 0;
    private cardList = [
        "card-add-fire",
        "card-add-water",
        "card-cover",
        "card-meat",
        "card-ong-choy",
        "card-onion",
        "card-remove-fire",
        "card-soup-mix",
        "card-stir",
        "card-taro",
        "card-tomato",
        "card-uncover",
        "card-wait"
    ]
    // private cooktopList = [
    //     "pot",
    //     "pot-cover",
    //     "pot-meat-in",
    //     "pot-taro-in",
    //     "pot-tomato-in",
    //     "pot-tomato-onion-in",
    //     "pot-water-in"
    // ]


    preload() {
        this.cookingStepsManager = new CookingStepsManager(this);
        this.cookingStepsManager.loadSteps();

        // Wait for loader to complete
        this.load.once('complete', () => {
            this.cookingStepsManager.processData();
            // console.log("Steps loaded successfully:", this.cookingStepsManager.steps)
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
        let cooktop = this.add.image(512, 435, 'pot');
        
        // display cards on the left
        // this.cards = [
        //     this.add.image(103, 227, ''),
        //     this.add.image(103, 227+164, ''),
        //     this.add.image(103, 227+164+164, '')
        // ]
        

        // creating a blank text to display steps
        this.kitchenText = this.add.text(512, 38, '', {
            fontFamily: 'Arial', fontSize: 18, color: '#ffffff',
            align: 'center'
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
        // console.log("currentStepData", currentStepData)
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
        
        const cardPositions = [
            { x: 103, y: 227 },
            { x: 103, y: 227 + 164 },
            { x: 103, y: 227 + 164 + 164 },
        ]

        // Destroy existing card images
        this.cardImages.forEach(image => {
            image.removeInteractive();
            image.destroy();
        });
        this.cardImages = [];
        
        // Get all available card images
        const allCardImages = this.getAllCardImages();

        // Pick from all images aside from the correct one to avoid duplicating
        const availableImages = allCardImages.filter(image => 
            image !== correctAnswer
        )
        
        // Randomize from the available images
        const wrongAnswers = this.getUniqueRandomItems(availableImages, 2);
        // debugging only
        // console.log("Wrong Answers:", wrongAnswers)
        
        // Combine correct and wrong answers
        const cardImages = [correctAnswer, ...wrongAnswers];
        // console.log("cardImages", cardImages)

        // Shuffle card images
        this.shuffleArray(cardImages)
        // console.log("Final Card Images:", cardImages);

        // Create and add new cards images
        cardImages.forEach((cardName, index) => {
            const newImage = this.add.image(
                cardPositions[index].x,
                cardPositions[index].y,
                `${cardName}`
            )

            // Make interactive and add click handler
            newImage.setInteractive();
            newImage.on('pointerdown', () => {
                if (cardName === correctAnswer) {
                    this.handleCorrectChoice();
                } else {
                    this.handleWrongChoice();
                }
            })

            // Add to cardImages array
            this.cardImages.push(newImage);
        })
        // this is unreachable
        // return cardImages;
    }

    private getAllCardImages(): string[] {
        return this.cardList
    }

    private shuffleArray(array: string[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j],array[i]];
        }
    }
    
    // Get unique items for choices
    private getUniqueRandomItems(arr: string[], count: number): string[] {
        const availableCopy = [ ...arr ];
        const result: string[] = [];

        count = Math.min(count, availableCopy.length);

        while (result.length < count) {
            const randomIndex = Math.floor(Math.random() * availableCopy.length);

            //Remove and add item
            const [ selectedItem ] = availableCopy.splice(randomIndex, 1);
            result.push(selectedItem);
        }

        return result;
    }    
    private handleCorrectChoice() {
        // console.log("Correct Answer!")
        this.progress++;

        // destory images here
        this.cardImages.forEach(card => {
            card.removeInteractive();
            card.destroy();
        });
        this.cardImages = [];

        // Change cooktop image
        this.changeCookTop();

        // Check if all steps are completed
        // Doesn't work yet lol
        if (this.progress >= this.cookingStepsManager.steps.length) {
            this.handleGameCompletion();
        }

        // Setup next step
        this.setupStep();
    }

    handleGameCompletion() {
        // console.log("Game Completed!");

        const victoryText = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY,
            'Congratulations! \nRecipe Completed!',
            {
                fontSize: '32px',
                align: 'center'
            }
        )
        victoryText.setOrigin(0.5);
    }

    private handleWrongChoice() {
        // console.log("Wrong Choice")
    }

    changeCookTop() {
        if (this.cooktop) {
            this.cooktop.destroy();
        }
    
        // get current step data
        const currentStepData = this.cookingStepsManager.steps.find(s => s.step === this.progress + 1)
        // I want to pull the cooktop value from the json file, that corresponds to the progress #
        if (currentStepData && currentStepData.cooktop && currentStepData.cooktop != "pot-covered") {
            const cooktopKey = currentStepData.cooktop.toString();
            this.cooktop = this.add.image(512, 435, cooktopKey);
        } else if (currentStepData && currentStepData.cooktop && currentStepData.cooktop === "pot-covered") {
            const cooktopKey = currentStepData.cooktop.toString();
            this.cooktop = this.add.image(512, 435-45, cooktopKey);
        }

        // adding fire between steps 3 and 20
        if (currentStepData && currentStepData.step < 20 && currentStepData.step >= 3) {
            if (this.fire) {
                this.fire.destroy()
            } 
            
            // Create new fire image
            this.fire = this.add.image(512, 540, 'fire');
        }
        // Remove fire at step 20 
        else if (currentStepData && currentStepData.step >= 20) {
            if (this.fire) {
                this.fire.destroy();
                this.fire = null;
            }
            
        }
        

    }
}
