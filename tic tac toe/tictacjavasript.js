const cellElement = document.querySelectorAll('[data-cell]');
const Board =document.getElementById('board');
const winertext =document.querySelector('[data-winning-msg-txt]');
const winnerpage= document.getElementById('winingmsg');
const restartbtn= document.getElementById("resetbutton");


const X_class= "x";
const Circle_class= "circle";
let circleturn = true;
const winningcombo =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

startthegame()

function startthegame(){
    cellElement.forEach(cell =>{
        cell.classList.remove(X_class);
        cell.classList.remove(Circle_class);
        cell.removeEventListener("click",handleclick)
        cell.addEventListener('click',handleclick,{once:true})
    })
    Boardhovereffect()
    winnerpage.classList.remove("show")
}

restartbtn.addEventListener("click",startthegame);

function handleclick(event){
    console.log(event);
    const cell= event.target;
    
    const currentClass= circleturn ? Circle_class:X_class;
    placeMark(cell,currentClass);
    


    if(checkwin(currentClass)){
        console.log("winner" + currentClass);
        endgame(false);

    }else if(isDraw()){
        endgame(true)

    }else {
        Boardhovereffect()
        circleturn = !circleturn;    
    }

}



function endgame(draw){
    if (draw){
        winertext.innerText ='Draw!'
    }else {
        winertext.innerText = `${circleturn ? "O's":"X's"} Winnnss!!`
    }

    winnerpage.classList.add("show");

}

function isDraw(){
    return [...cellElement].every(cell =>{
        return cell.classList.contains(X_class)||cell.classList.contains(Circle_class)
    })
}

function placeMark(cell,currentClass){
    cell.classList.add(currentClass);
}

function Boardhovereffect(){
    Board.classList.remove(X_class)
    Board.classList.remove(Circle_class)
    console.log("circles turn:"+circleturn)
    if (circleturn){
        Board.classList.add(X_class)
    }else{
        Board.classList.add(Circle_class)
    }
}

function checkwin(currentClass){
    return winningcombo.some(combos=>{
        return combos.every(index=>{
            return cellElement[index].classList.contains(currentClass)
        })
    })
}