import React, { useEffect, useRef, useState } from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import { featuredProducts } from '../data/mock';
import { useToast } from '../hooks/use-toast';

const FeaturedProducts = () => {
  const { toast } = useToast();
  const [visible, setVisible] = useState(false);
  const gridRef = useRef(null);

  const addToCart = (name) => {
    toast({
      title: 'Adicionado ao carrinho',
      description: `${name} foi adicionado ao seu carrinho.`,
    });
  };

  useEffect(() => {
    const node = gridRef.current;
    if (!node) return undefined;
    
    const obs = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.1 } // Começa a animação assim que 10% da grelha aparece
    );
    
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="loja" className="bg-[#0a0a0a] py-24 px-6 relative z-0">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-14">
          <p className="text-[#C0C0C0] text-[12px] tracking-[0.3em] font-bold uppercase mb-3">
            Os Nossos Produtos
          </p>
          <h2 className="font-display text-[#C0C0C0] text-[42px] md:text-[54px] font-black uppercase leading-[0.95] tracking-tight">
            Destaques da Loja
          </h2>
        </div>

        {/* Grelha de produtos com ref */}
        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((p, index) => (
            
            // 1. O Wrapper que "corta" o movimento (Overflow Hidden)
            <div key={p.name} className="overflow-hidden">
              
              {/* 2. O Cartão que desliza de cima para baixo */}
              <div 
                className={`
                  group relative bg-[#141414] border border-[#C0C0C0]/10 transition-all duration-1000 ease-out
                  ${visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
                `}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <button
                    className="absolute top-4 right-4 w-9 h-9 bg-[#0a0a0a]/80 backdrop-blur rounded-full flex items-center justify-center text-[#C0C0C0] hover:bg-[#C0C0C0] hover:text-[#0a0a0a] transition-colors"
                    aria-label="Wishlist"
                  >
                    <Heart size={16} />
                  </button>
                </div>
                
                <div className="p-6">
                  <p className="text-[#C0C0C0] text-[10px] tracking-[0.25em] font-bold uppercase mb-2">{p.category}</p>
                  <h3 className="text-[#C0C0C0] text-[16px] font-bold mb-1">{p.name}</h3>
                  <p className="text-[#C0C0C0] text-[18px] font-black mb-4">{p.price}</p>
                  <button
                    onClick={() => addToCart(p.name)}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#C0C0C0] hover:bg-[#D8AF73] text-[#0a0a0a] px-5 py-3 text-[11px] tracking-[0.22em] font-bold uppercase transition-colors"
                  >
                    <ShoppingCart size={14} />
                    Adicionar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;