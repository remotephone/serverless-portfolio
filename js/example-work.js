import React from 'react';
import ExampleWorkModal from './example-work-modal';

class ExampleWork extends React.Component{

    constructor(props) {
      super(props);

      // we need to manage state, Two things, is it open and which one.
      this.state = {
        'modalOpen': false,
        'selectedExample': this.props.work[0]
      };

      // Gives this function access to our object
      this.openModal = this.openModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
    }

    // When this function is called, state is set, react notices, it updates
    // modal opens

    openModal(evt, example) {
      this.setState({
        'modalOpen': true,
        'selectedExample': example
      });
    };

    closeModal(evt, example) {
      this.setState({
        'modalOpen': false
      });
    };

    render() {
        return (
            // class is reserved! can't use it
            // Had to find replace class for className

            // This is tricky!!! I Wrote this bit, but had some syntax errors
            // Watch webpack output to see where your errors are as you save

            /* Here we are mapping our example work to our ExampleWorkBubble.
            Basically take what I have, do it as many times as I have items in my index, 
            and render that nicely*/

            /* So we slapped the ExampleWorkModal element in here, but we can only return
            one JSX tag from our render method. We were returning two, so we wrapped everything
            in a span tag. My tests fail immediately, so see test-wexample-work.js for changes */

            <span>
            <section className="section section--alignCentered section--description">

            { this.props.work.map( (example, idx) => {
                return (
                  // Passing the openModal Function as a property.
                    <ExampleWorkBubble example={example} key={idx} 
                    openModal={this.openModal} />
                    )
                })
            };
          </section>
          
          <ExampleWorkModal example={this.state.selectedExample} open={this.state.modalOpen} closeModal={this.closeModal} />
          </span>
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
            // This was broken for a while. onClick needs to exist in tthe div you're affecting. :|
            <div className="section__exampleWrapper" onClick={ (evt) => this.props.openModal(evt, example) }>
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