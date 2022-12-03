import { Stack, Typography } from "@mui/material";
import Image from "next/image";
import logo from "../../public/images/logo.png";


export default function Footer(props) {
    //footer do site
    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ backgroundColor: "primary.main", color: "primary.contrastText", padding: "0 20px", marginTop: "290px", '@media screen and (max-width: 768px)': {
                flexWrap: 'wrap'
            }}}
        >
            <Stack direction="row" spacing={2} alignItems="center">
                <Image src={logo} alt="logo" width={300}  />
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" sx={{ width: '100%',
                '@media screen and (max-width: 768px)': {
                    flexWrap: 'wrap'
                },
            }}>
                <Typography variant="h5">(11) 99999-9999</Typography>
                <Typography variant="h5">pizzadosguri@gmail.com</Typography>
            </Stack>
        </Stack>

    )

}