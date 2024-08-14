import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Paper, Box, Card, CardMedia } from '@mui/material';

import Banner from '../../images/banner.jpg';
import ImgOne from '../../images/imgOne.jpg';
import ImgTwo from '../../images/imgTwo.jpg';
import ImgThree from '../../images/imgThree.jpg';
import ImgFour from '../../images/imgFour.jpg';
import ImgFive from '../../images/imgFive.jpg';
import ImgSix from '../../images/imgSix.jpg';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ImageCarousel() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    };

    return (
        <Slider {...settings}>
            <div>
                <img src={ImgOne} alt="Image One" style={{ width: '100%', height: '100%', borderRadius: 20 }} />
            </div>
            <div>
                <img src={ImgTwo} alt="Image Two" style={{ width: '100%', height: '100%', borderRadius: 20 }} />
            </div>
            <div>
                <img src={ImgThree} alt="Image Three" style={{ width: '100%', height: '100%', borderRadius: 20 }} />
            </div>
            <div>
                <img src={ImgFour} alt="Image Four" style={{ width: '100%', height: '100%', borderRadius: 20 }} />
            </div>
            <div>
                <img src={ImgFive} alt="Image Five" style={{ width: '100%', height: '100%', borderRadius: 20 }} />
            </div>
            <div>
                <img src={ImgSix} alt="Image Six" style={{ width: '100%', height: '100%', borderRadius: 20 }} />
            </div>
        </Slider>
    );
}


function Benefits() {
    return (
        <div className='containerBenefits'>
            <Grid container spacing={0} sx={{ height: '100%', marginTop: 0 }} >

                <Grid item xs={12} sx={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant="h2" color="white" sx={{ mb: 1, fontFamily: '"Montserrat", Sans-serif', fontWeight: '700', fontSize: { lg: 76, xl: 76, }, }}>ICP COLOMBIA</Typography>
                    <Typography variant="h4" color="white" sx={{ mt: 3, mb: 2, fontFamily: '"Montserrat", Sans-serif', }}>¡Estamos trabajando en algo increíble!</Typography>
                    <Typography variant="body1" color="white" sx={{ mt: 3, mb: 2, fontFamily: '"Montserrat", Sans-serif', fontStyle: 'italic', fontSize: 20, width: { xs: '90%', lg: '50%' } }}>
                        Gracias por tu paciencia mientras construimos una nueva experiencia para ti. Estamos ocupados creando algo especial que pronto estará disponible.
                    </Typography>
                </Grid>

                <Grid item xs={12} sx={{ mb: 8, display: 'flex', justifyContent: 'center', alignItems: 'center' }} >

                    <Card sx={{ maxWidth: { xs: '90%', lg: '50%' } }}>
                        <CardMedia
                            component="img"
                            // height="40"
                            image={Banner}
                            alt="Descriptive Alt Text"
                        />
                    </Card>
                </Grid>

                <Grid container spacing={0} justifyContent={'center'}>
                    <Grid item xs={10}>
                        <ImageCarousel />
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default Benefits;    