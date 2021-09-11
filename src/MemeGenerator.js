import React from 'react'

class MemeGenerator extends React.Component{
    constructor()
    {
        super()
        this.state = {
            topText: '',
            bottomText: '',
            randomImage: 'http://i.imgflip.com/1bij.jpg',
            allMemeImages: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount()
    {
        fetch("https://api.imgflip.com/get_memes")
        .then(response => response.json())
        .then(resp => {
            this.setState({
                allMemeImages: resp.data.memes
            })
        })
    }

    handleChange(event)
    {
        const {name, value} = event.target
        this.setState({
            [name] : value
        })
    }

     
    handleSubmit(event) {
        event.preventDefault()
        // get a random int (index in the array)
        const index = Math.floor(Math.random() * this.state.allMemeImages.length)
        // get the meme from that index
        const randomMeme = this.state.allMemeImages[index].url
        // set `randomImg` to the `.url` of the 
        this.setState({
            randomImage: randomMeme
        })
    }

    render()
    {
        return(
            <div>
                <form className = 'meme-form' onSubmit = {this.handleSubmit}>
                    <input 
                            type = 'text'
                            placeholder = 'Enter top text'
                            name = 'topText'
                            value = {this.state.topText}
                            onChange = {this.handleChange}
                    />
                    <input 
                            type = 'text'
                            placeholder = 'Enter bottom text'
                            name = 'bottomText'
                            value = {this.state.bottomText}
                            onChange = {this.handleChange}
                    />

                    <button>Generate</button>
                </form>
                <div className = 'meme'>
                    <img src = {this.state.randomImage} alt = ''/>
                    <h2 className = 'top'>{this.state.topText}</h2>
                    <h2 className = 'bottom'>{this.state.bottomText}</h2>
                </div>
           
           </div>
        )
    }
}

export default MemeGenerator