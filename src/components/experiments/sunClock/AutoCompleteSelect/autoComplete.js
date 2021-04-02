/**
 * @param {string} char - character held within the node. default: null
 *
 * let node = new TrieNode('a')
 *
 * console.log(node.char) -> 'a'
 */
export class TrieNode {
  constructor(char = null) {
    this.char = char;
    this.children = {};
    this.parent = null;
    this.wordComplete = false;
  }

  /**
   *
   * @returns the full word of which this node is part
   */
  getWord() {
    let node = this;
    let letters = [];

    while (node) {
      letters.unshift(node.char);
      node = node.parent;
    }

    return letters.join("");
  }
}

/**
 * A collection of words stored in a series of TrieNodes
 *
 * @param {array} [words="[]"] - Array of strings to be added to the Trie. Each will be converted to lowercase before adding
 * 
 */
export class Trie {
  constructor(words = []) {
    this.root = new TrieNode(); // first node has null value
    this.addWords(words);
  }

  /**
   * 
   * @param {array} words - Array of strings to be added to the Trie. Each will be converted to lowercase before adding
   */
  addWords(words) {
    let node = this.root;

    words.forEach((word) => {
      // lowercase each word and add it to the trie
      [...word.toLowerCase()].forEach((letter, i) => {
        if (node.children.hasOwnProperty(letter)) {
          // if the letter is already in the trie,
          // that becomes the current node
          node = node.children[letter];
        } else {
          // if the letter isn't in the trie,
          // add the letter to the trie and move to the new letter
          node.children[letter] = new TrieNode(letter);
          node.children[letter].parent = node;
          node = node.children[letter];
        }

        // at the last letter, the word is complete,
        if (i === word.length - 1) {
          node.wordComplete = true;
          node = this.root; // go back to root node
        }
      });
    });
  }

  /**
   * Recursive function to find all the words that start from a particular node
   * 
   * @param {TrieNode} node starting node
   * @param {array} words running list of words
   * @returns array of words starting at the given node
   */
  findAllWords = (node, words) => {
    if (node.wordComplete) {
      words.push(node.getWord());
    }

    for (let child in node.children) {
      this.findAllWords(node.children[child], words);
    }

    return words;
  };

  /**
   * 
   * @returns array of all the words currently in the Trie
   */
  allWords() {
    let node = this.root;
    let words = [];

    this.findAllWords(node, words);

    return words;
  }

  /**
   * Recursive function to find all the words in the Trie 
   * which begin with the given prefix
   * @param {string} prefix 
   * @returns array of words beginning with the given prefix
   */
  find(prefix) {
    let node = this.root;
    let words = [];

    for (let i = 0; i < prefix.length; i++) {
      if (node.children[prefix[i]]) {
        node = node.children[prefix[i]];
      } else {
        return words;
      }
    }
    this.findAllWords(node, words);

    return words;
  }
}

let wordList = ['cat', 'catch', 'act', 'ale']

let t = new Trie();

t.addWords(wordList);


let words = t.allWords();
console.log(words);
