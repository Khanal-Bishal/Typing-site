const quoteApi='https://api.quotable.io/random';
const quoteDisplayElement=document.querySelector('.quote-display');
const quoteInputElement=document.querySelector('#quoteInput');
const reloadButton=document.querySelector('.reload-button');
const forwardButton=document.querySelector('.forward-button');

quoteInputElement.addEventListener('input',()=>
{
    const audio=new Audio('move.mp3');
    audio.play();


    const arrayQuote= quoteDisplayElement.querySelectorAll('span');
    const arrayValue= quoteInputElement.value.split("");
    let correct=true;

    arrayQuote.forEach((charSpan,index)=>
    {
        const char =arrayValue[index];
        if(char==null)
        {
            charSpan.classList.remove('incorrect');
            charSpan.classList.remove('correct');
            correct=false;
        }
        
       else if(char===charSpan.innerText)
        {
            charSpan.classList.add('correct');
            charSpan.classList.remove('incorrect');
        }
         else 
         {
            charSpan.classList.add('incorrect');
            charSpan.classList.remove('correct');
            correct=false;
         }
       
    }
  
    )
    if(correct===true)
    {
        const finishAudio=new Audio('food.mp3');
        finishAudio.play();
        quoteDisplayElement.innerText=null;
        renderNewQuote();
    }

})



const getRandomQuote= ()=>
{

const data=fetch(quoteApi)
            .then(res=> res.json())
            .then(data=>data.content);
return data;
}
const renderNewQuote=async ()=>
{
    
    quoteInputElement.value=null;
    let quote=await getRandomQuote();
  quote.split('').forEach(char => {
    const charSpan=document.createElement('span');
    charSpan.innerText=char;
   
    quoteDisplayElement.appendChild(charSpan)
  }
  
  );
   
    
}
renderNewQuote();

reloadButton.addEventListener('click',()=>
{
    const arrayQuote= quoteDisplayElement.querySelectorAll('span');
    arrayQuote.forEach(char=>
        {
            char.classList.remove('correct');
            char.classList.remove('incorrect');
        })
    quoteInputElement.value=null;
})

forwardButton.addEventListener('click',()=>
{
    quoteDisplayElement.innerText=null;
    quoteInputElement.value=null;
    renderNewQuote();
})