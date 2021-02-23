const stateList = require('../../../constants/stateList');

export class TrieNode {
  constructor(char = null) {
    this.char = char;
    this.children = {};
    this.parent = null;
    this.wordComplete = false;
  }

  getWord(){
    let node = this;
    let letters = [];

    while(node){
      letters.unshift(node.char)
      node = node.parent;
    }

    return letters.join('');
  }
}

export class Trie {
  constructor(words = []) {
    this.root = new TrieNode(); // first node has null value

  }

  addWords(...words) {
    let node = this.root;

    words.forEach(word => {

      [...word].forEach((letter, i) => {
        if (letter in node.children) {
          node = node.children[letter];
        } else {
          node.children[letter] = new TrieNode(letter);
          node.children[letter].parent = node;
          node = node.children[letter];
        }
        
        if(i === word.length-1){
          node.wordComplete = true;
        }
        
      })
    });
  }

  findAllWords = (node, words) => {

    if(node.wordComplete){
      words.push(node.getWord());  
    }
    
    for (let child in node.children) {
      this.findAllWords(node.children[child], words)
    }

    return words
  }

  allWords() {
    let node = this.root;
    let words = [];

    this.findAllWords(node, words)
  
    return words
  }

  find(prefix){
    let node = this.root;
    let words = []

    for(let i=0; i<prefix.length; i++){
      if(node.children[prefix[i]]){
        node = node.children[prefix[i]]
      } else {
        return words
      }
    }
      this.findAllWords(node, words)

      return words;
    
  }
}


// let t = new Trie();

// // t.addWord("elephant");
// // t.addWord("ear");
// // t.addWord("carrot")
// // t.addWord("carpool")
// // t.addWord("cathedral")
// // t.addWord("clavical")


// stateList.forEach(state=>{
//   t.addWords(state.label.toLowerCase())
// })

// let words = t.allWords();
// console.log(words);




