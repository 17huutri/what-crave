import React from 'react'
import Banner from '../components/LandingPage/Banner'
import TopSection from '../components/LandingPage/TopSection'
import Words from '../components/LandingPage/Words'
import Information from '../components/LandingPage/Information'
import Footer from '../components/Footer/Footer'

const Home = () => {
    return (
        <div>
            <Banner />
            <Information />
            <TopSection />
            <Words />
            <Footer />

        </div>
    )
}

export default Home
