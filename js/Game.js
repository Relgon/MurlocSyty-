
/**
 * Created by Admin on 17.10.2015.
 */

var easeInSpeed = function(x){
    return x * Math.abs(x) / 2000;
}


var init=function() {
    var width=window.innerWidth, //360
        height=window.innerHeight;   //640
    var pixelRatio = window.devicePixelRatio || 1; //1.5
    //var game=new Phaser.Game(width*pixelRatio, height*pixelRatio, Phaser.AUTO, 'test', null, false, true);
    var game=new Phaser.Game(1000,1000, Phaser.AUTO, 'test', null, false, true);
    this.game = game;
    var BasicGame=function(game){};
    BasicGame.Boot=function(game){};
    BasicGame.Boot.prototype =
    {
        preload : function() {
            this.load.image('compass', 'assets/compass_rose.png');
            this.load.image('touch_segment', 'assets/touch_segment.png');
            this.load.image('touch', 'assets/touch.png');
            this.load.image('background', 'assets/background.png');
            this.load.spritesheet('buttons', 'assets/buttons.png', 215, 41);
            this.load.spritesheet('githubstar', 'assets/github.png', 377, 75);
            this.load.spritesheet('character', 'assets/rpg_sprite_walk.png', 72, 96, 32);
            this.load.image('star','assets/star.png');

        },
        create : function() {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.touchControl = this.game.plugins.add(Phaser.Plugin.TouchControl);
            this.game.touchControl.inputEnable();
            this.game.touchControl.settings.singleDirection=true;

            this.tilesprite = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'background');
            this.tilesprite.scale.set(1);
            //this.character = this.add.sprite(this.world.centerX, this.world.centerY, 'character');
            this.character = this.add.sprite(width/2,height/2, 'character');
            this.character.anchor.set(0.5);
            this.game.physics.arcade.enable(this.character);


            this.character.animations.add('walkDown', [0 ,1 ,2 ,3 ,4 ,5 ,6 ,7], 20 /*fps */, true);
            this.character.animations.add('walkUp',   [8 ,9 ,10,11,12,13,14,15], 20 /*fps */, true);
            this.character.animations.add('walkLeft', [16,17,18,19,20,21,22,23], 20 /*fps */, true);
            this.character.animations.add('walkRight',[24,25,26,27,28,29,30,31], 20 /*fps */, true);

            this.character.body.collideWorldBounds=true;
            this.game.camera.follow(this.character);
        },
        update : function() {
            var speed=this.game.touchControl.speed,
                SCALING_CONSTANT=2;

            this.character.body.velocity.x=0;
            this.character.body.velocity.y=0;
            console.log(speed);
            if (this.game.touchControl.cursors.up){
                this.character.body.velocity.y=-speed.y*SCALING_CONSTANT;
                this.character.play('walkUp');
            } else if (this.game.touchControl.cursors.down){
                this.character.body.velocity.y=-speed.y*SCALING_CONSTANT;
                this.character.play('walkDown');
            } else if (this.game.touchControl.cursors.left){
                this.character.body.velocity.x=-speed.x*SCALING_CONSTANT;
                this.character.play('walkLeft');
            } else if (this.game.touchControl.cursors.right) {
                this.character.body.velocity.x =-speed.x*SCALING_CONSTANT;
                this.character.play('walkRight');
            } else{
                this.character.animations.stop(0,true);
            }

        },

        render : function() {

        }

    };

    game.state.add('Boot', BasicGame.Boot);
    game.state.start('Boot');

};

window.onload = init;

