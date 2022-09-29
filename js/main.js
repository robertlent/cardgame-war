document.querySelector('button').addEventListener('click', drawCards)

let deckID = (localStorage.getItem('deckID')) ? localStorage.getItem('deckID') : ''
let url = (deckID === '') ? 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1' : `https://deckofcardsapi.com/api/deck/${deckID}/shuffle/?remaining=true`

fetch(url)
  .then(res => res.json())
  .then(data => {
    if (deckID === '') {
      deckID = data.deck_id
      localStorage.setItem('deckID', deckID)
    }
  })
  .catch(err => {
    console.log(`error ${err}`)
  });

function drawCards() {
  const url = `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=2`

  fetch(url)
    .then(res => res.json())
    .then(data => {
      document.querySelector('#playerOneCard').src = data.cards[0].image
      document.querySelector('#playerTwoCard').src = data.cards[1].image

      let player1Val = convertToNum(data.cards[0].value)
      let player2Val = convertToNum(data.cards[1].value)

      document.querySelector('h3').innerText = ((player1Val === player2Val) ? /* Start war */ "" : ((player1Val > player2Val) ? "Player 1 won this hand" : "Player 2 won this hand"))
    })
}

function convertToNum(val) {
  switch (val) {
    case 'ACE':
      val = 14
      break
    case 'KING':
      val = 13
      break
    case 'QUEEN':
      val = 12
      break
    case 'JACK':
      val = 11
      break
    default:
      val
  }

  return Number(val)
}