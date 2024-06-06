import React from 'react'
import Banner from '../components/LandingPage/Banner'
import TopSection from '../components/LandingPage/TopSection'
import Words from '../components/LandingPage/Words'
import Information from '../components/LandingPage/Information'
import TopNews from '../components/LandingPage/TopNews'

const Home = () => {
    return (
        <div>
            <Banner />
            <Information />
            <TopSection />
            <Words />
            <TopNews />

        </div>
    )
}

export default Home
