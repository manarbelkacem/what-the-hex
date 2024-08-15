import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  targetColorCode:string='';
  colors:string[]=[];
  resultMessage:string='';
  resultClass:string='';
  points:number=0;
  attempts:number=0;
  gamePause:boolean=false;

  getRandomHexColor(): string {
    //  the total number of colors in the RGB color space (256^3 = 16,777,216)
    const MAX_COLOR_VALUE:number = 16777215;
    // Generate a random number between 0 and the maximum color value
    const randomColorNumber:number = Math.floor(Math.random() * MAX_COLOR_VALUE);
    // Convert the random number to a hexadecimal string representation
    const hexColor:string = randomColorNumber.toString(16);
    // Return the hexadecimal color string prefixed with '#'
    return '#' + hexColor;
  }

  selectRandomColor(){
    const randomIndex:number=Math.floor(Math.random() * 4);//random number between 0 and 3
    // Select a random color as the correct one
    this.targetColorCode = this.colors[randomIndex];
  }

  startNewGame(){
    this.colors=[];
    this.resultMessage='';
    this.resultClass='';
    this.gamePause=false;
    for (let i = 0; i < 4; i++) {
      this.colors.push(this.getRandomHexColor())
    }
    this.selectRandomColor();
  }

  checkColor(selectedColor:string){
    if(this.gamePause==false){
        this.attempts++;
        if(selectedColor==this.targetColorCode){
          this.resultMessage='Correct! 🎉';
          this.resultClass='text-success';
          this.points++;
          this.gamePause=true;
        }else{
          this.resultMessage='Wrong! Try Again.'
          this.resultClass='text-danger';
        }
    }
  }

  ngOnInit(): void {
    this.startNewGame();
  }
}
