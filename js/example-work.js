import React from 'react';

class ExampleWork extends React.Component{
    render() {
        return (
            // class is reserved! can't use it
            // Had to find replace class for className

            // This is tricky!!! I Wrote this bit, but had some syntax errors
            // Watch webpack output to see where your errors are as you save

            /* Here we are mapping our example work to our ExampleWorkBubble.
            Basically take what I have, do it as many times as I have items in my index, 
            and render that nicely*/

            <section className="section section--alignCentered section--description">

            { this.props.work.map( (example, idx) => {
                return (
                    <ExampleWorkBubble example={example} key={idx} />
                    )
                })
            }
          </section>
          )
    }
}


// One main component per file!


class ExampleWorkBubble extends React.Component {
    render() {
        let example = this.props.example;

        return (
            // Extract data for each structure that makes it unique
            //Description of image, image source file, Title of work example.
            <div className="section__exampleWrapper">
              <div className="section__example">
                <img alt={ example.image.desc }
                     className="section__exampleImage"
                     src={ example.image.src }/>
                <dl className="color--cloud">
                  <dt className="section__exampleTitle section__text--centered">
                    { example.title }
                  </dt>
                  <dd></dd>
                </dl>
              </div>
            </div>
      
        )
    }
}

// Different than python! You can't import anything you don't export just cause it lives in the same dir
// Doing two things here - anything that imports ExampleWork gets it
// You must explicitly ask for ExampleWorkBubble to get it. 
export default ExampleWork
export { ExampleWorkBubble };