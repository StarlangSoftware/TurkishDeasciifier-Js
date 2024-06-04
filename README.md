Turkish Deasciifier
============

This tool is used to turn Turkish text written in ASCII characters, which do not include some letters of the Turkish alphabet, into correctly written text with the appropriate Turkish characters (such as ı, ş, and so forth). It can also do the opposite, turning Turkish input into ASCII text, for the purpose of processing.

Video Lectures
============

[<img src="https://github.com/StarlangSoftware/TurkishDeasciifier/blob/master/video.jpg" width="50%">](https://youtu.be/b18-k8SKQ6U)

For Developers
============

You can also see [Python](https://github.com/starlangsoftware/TurkishDeasciifier-Py), [Java](https://github.com/starlangsoftware/TurkishDeasciifier), 
[C++](https://github.com/starlangsoftware/TurkishDeasciifier-CPP), [C](https://github.com/starlangsoftware/TurkishDeasciifier-C), [Swift](https://github.com/starlangsoftware/TurkishDeasciifier-Swift), 
[Cython](https://github.com/starlangsoftware/TurkishDeasciifier-Cy) or [C#](https://github.com/starlangsoftware/TurkishDeasciifier-CS) repository.

## Requirements

* [Node.js 14 or higher](#Node.js)
* [Git](#git)

### Node.js 

To check if you have a compatible version of Node.js installed, use the following command:

    node -v
    
You can find the latest version of Node.js [here](https://nodejs.org/en/download/).

### Git

Install the [latest version of Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

## Npm Install

	npm install nlptoolkit-deasciifier
	
## Download Code

In order to work on code, create a fork from GitHub page. 
Use Git for cloning the code to your local or below line for Ubuntu:

	git clone <your-fork-git-link>

A directory called util will be created. Or you can use below link for exploring the code:

	git clone https://github.com/starlangsoftware/turkishdeasciifier-js.git

## Open project with Webstorm IDE

Steps for opening the cloned project:

* Start IDE
* Select **File | Open** from main menu
* Choose `Deasciifier-Js` file
* Select open as project option
* Couple of seconds, dependencies will be downloaded. 

Detailed Description
============

+ [Asciifier](#using-asciifier)
+ [Deasciifier](#using-deasciifier)

## Using Asciifier

Asciifier converts text to a format containing only ASCII letters. This can be instantiated and used as follows:

      let asciifier = SimpleAsciifier()
      let sentence = Sentence("çocuk")
      let asciified = asciifier.asciify(sentence)
      console.log(asciified)

Output:
    
    cocuk      

## Using Deasciifier

Deasciifier converts text written with only ASCII letters to its correct form using corresponding letters in Turkish alphabet. There are two types of `Deasciifier`:


* `SimpleDeasciifier`

    The instantiation can be done as follows:  
    
        let fsm = FsmMorphologicalAnalyzer()
        let deasciifier = SimpleDeasciifier(fsm)
     
* `NGramDeasciifier`
    
    * To create an instance of this, both a `FsmMorphologicalAnalyzer` and a `NGram` is required. 
    
    * `FsmMorphologicalAnalyzer` can be instantiated as follows:
        
            let fsm = FsmMorphologicalAnalyzer()
    
    * `NGram` can be either trained from scratch or loaded from an existing model.
        
        * Training from scratch:
                
                let corpus = Corpus("corpus.txt")
                let ngram = NGram(corpus.getAllWords(), 1)
                ngram.calculateNGramProbabilities(new LaplaceSmoothing())
                
        *There are many smoothing methods available. For other smoothing methods, check [here](https://github.com/olcaytaner/NGram).*       
        * Loading from an existing model:
     
                    let ngram = NGram("ngram.txt")

	*For further details, please check [here](https://github.com/starlangsoftware/NGram-Js).*        
            
    * Afterwards, `NGramDeasciifier` can be created as below:
        
            let deasciifier = NGramDeasciifier(fsm, ngram)
     
A text can be deasciified as follows:
     
    let sentence = Sentence("cocuk")
    let deasciified = deasciifier.deasciify(sentence)
    console.log(deasciified)
    
Output:

    çocuk
