import React from 'react'
import './FeedLoader.css'

const FeedLoader = () => {

    return (
        <div className="wrapper">
            <div className='feedContainer'>
                <div className="feed feedLoader">
                    <div className="loaderHeader">
                        <div className="profilPicLoader">
                            <div className="animated-background"></div>
                        </div>
                        <div className="profileNameLoader">
                            <div className="animated-background"></div>
                        </div>
                    </div>
                    <div className="feedLoaderBody">
                        <div className="animated-background"></div>
                    </div>
                    <div className="profileNameLoader likesLoader">
                            <div className="animated-background"></div>
                        </div>

                </div>
                <div className="feed feedLoader">
                    <div className="loaderHeader">
                        <div className="profilPicLoader">
                            <div className="animated-background"></div>
                        </div>
                        <div className="profileNameLoader">
                            <div className="animated-background"></div>
                        </div>
                    </div>
                    <div className="feedLoaderBody">
                        <div className="animated-background"></div>
                    </div>
                    <div className="profileNameLoader likesLoader">
                            <div className="animated-background"></div>
                        </div>

                </div>
            </div>
        </div>
    )
}

export default FeedLoader