'use client';
import Image from 'next/image';
import estilos from "./page.module.css";
import Banner from "/public/banner.png";
import { useState } from "react";
import {filtrarProdutos, buscarProduto, produtosEntradas,} from './Servico';
import Cards from './Componentes/Cards';
import Categorias from './Componentes/Categorias';
import CampoDeBusca from './Componentes/CampoDeBusca';


export default function Home() {

  const [dadosFiltrados, setDadosFiltrados] = useState(produtosEntradas);
  const [textoBuscaDigitado, setTextoBuscaDigitado] = useState("");
  const [botaoClicado, setBotaoClicado] = useState("Entradas");

  const handleBusca = (textoDigitado) => {
    setTextoBuscaDigitado(textoDigitado);
    textoDigitado.length >= 3 && setDadosFiltrados(buscarProduto(textoDigitado));
    setBotaoClicado("");
  };

  const handleFiltro = (categoria) => {
    setTextoBuscaDigitado("");
    setDadosFiltrados(filtrarProdutos(categoria));
    setBotaoClicado(categoria);
  };

  return (
    <>
      <header className={estilos.topo}>
        <Image src={Banner} alt="banner" />
        <div>
          <h1>RESTAURANTE</h1>
          <h1>LAVOSIER</h1>
          <p>O melhor da culinária Internacional </p>
          <p>Uma Explosão de Sabores</p>
        </div>
      </header>
      <main className={estilos.container_principal}>
        <Categorias handleFiltro={handleFiltro}
          botaoClicado={botaoClicado}  />

        <CampoDeBusca textoBuscaDigitado={textoBuscaDigitado}
          handleBusca={handleBusca}  />

        <section className={estilos.secao_cards}>
          <h2>Cardápio</h2>
          <div className={estilos.container_cards}>
            {dadosFiltrados.map((produto) => (
              <Cards key={produto.id} produto={produto} />
            ))}
          </div>
        </section>
      </main>
    
      <footer className={estilos.footer}>
        <div>
         <p>Copyright 2025 &copy; <span>Filipi Pereira</span></p>
        </div>
      </footer> 
 </>
  )
}

