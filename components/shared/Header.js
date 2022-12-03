import { Tabs, Tab} from "@mui/material";
import { useRouter } from "next/router";


export default function Header(props) {
    const router = useRouter();

    const itens = [
        { label: "Cardapio", href: "/" },
        { label: "Admin", href: "/admin" },
    ]

    return (
        <Tabs
            value={props.value}
            onChange={(event, newValue) => {
                router.push(newValue);
            }}
            indicatorColor="primary"
        >
            {itens.map((item) => (
                <Tab label={item.label} value={item.href} />
            ))}
        </Tabs>
    )

}