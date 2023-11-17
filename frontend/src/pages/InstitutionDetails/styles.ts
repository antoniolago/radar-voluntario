import { styled } from "@mui/material";

export const InsitutionImage = styled('img')`
    max-width: 500px;
    height: auto;
    max-height: 500px;
`

export const SocialMedialList = styled('div')`
    display: flex;
    img {
        width: 40px;
    }
    .info { 
        display: flex;
        margin-bottom: 10px;
        margin-right: 10px;
        margin-top: 10px;
    }
    .icon {
        margin-right: 3px;
    }
    .social-media {
        padding-top:9px
    }
`