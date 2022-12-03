import Head from 'next/head'
import Header from '../../components/shared/Header'
import styles from '../../styles/Home.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Select, Typography, MenuItem, Button, Chip, Card } from '@mui/material'
import { MenuUnstyled } from '@mui/base'
import { Stack } from '@mui/system'
import { useRouter } from 'next/router'
import Footer from '../../components/shared/Footer'


export default function Home() {
	const [pedido, setPedido] = useState(null);

    const { query, push } = useRouter();

	useEffect(() => {
        if( query ){
            axios.get(`http://localhost:3000/api/pizzas/${query.id}`)
                .then((response) => {
                    setPedido(response.data);

                })  
                .catch((error) => {
                    console.log(error);
                    if(error.response.status == 404){
                        push('/');
                    }
                });
        }

	}, [query]);

    const getStatusLabel = (status) => {
        switch(status){
            case 'concluida':
                return 'Concluído';
            case 'cancelada':
                return 'Cancelado';
            case 'em-producao':
                return 'Em andamento';
            case 'pronta':
                return 'Aguardando retirada';
        }

        return 'Status inválido';
    }

    const getStatusColor = (status) => {
        switch(status){
            case 'concluida':
                return 'success';
            case 'cancelada':
                return 'error';
            case 'em-producao':
                return 'warning';
            case 'pronta':
                return 'info';
        }

        return 'primary';
    }

	return (
		<div>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Header value="/cardapio" />
            {pedido && (
                <Stack spacing={2} direction="column" justifyContent="center" alignItems="center">
                    <Card sx={{padding: 2, marginTop: 2}}>
                        <Typography align="center" variant="h3">Acompanhe seu pedido</Typography>

                        <Stack direction="row" spacing={2} justifyContent="center" sx={{marginBottom: 2}}>
                            <Chip label={getStatusLabel(pedido.status)} color={getStatusColor(pedido.status)} />
                        </Stack>

                        <Typography align="center" variant="h4">Sabores</Typography>
                        <Typography align="center" variant="h5">{pedido.sabores}</Typography>
            
                        <Typography align="center" variant="h4">Massa</Typography>
                        <Typography align="center" variant="h5">{pedido.massa}</Typography>
            
                        <Typography align="center" variant="h4">Borda</Typography>
                        <Typography align="center" variant="h5">{pedido.borda}</Typography>
                    </Card>
                </Stack>
            )}
            <Footer />
		</div>	
	)
}
