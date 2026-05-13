export const navItems = [
  {
    label: 'SOBRE', href: '/sobre', dropdown: [
      { label: 'Sobre Nós', href: '/sobre' },
      { label: 'O que é a Aromaterapia', href: '/aromaterapia' },
    ]
  },
  {
    label: 'AROMATIZAÇÃO', href: '/difusores', dropdown: [
      { label: 'Difusores', href: '/difusores' },
      { label: 'Fragrâncias', href: '/fragrancias' },
    ]
  },
  { label: 'SEGMENTOS', href: '/segmentos' },
  { label: 'CONTACTOS', href: '/contactos' },
];

export const heroSlides = [
  {
    image: 'https://images.pexels.com/photos/33803739/pexels-photo-33803739.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1600',
    label: 'Aromatização de Espaços',
    title: 'A essência\ncerta para\no seu espaço',
    cta: 'Descubra Mais',
    href: '#loja',
  },
  {
    image: 'https://images.pexels.com/photos/28744939/pexels-photo-28744939.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=600&w=600',
    label: 'Hotelaria & Hospitalidade',
    title: 'Experiências\nque ficam\nna memória',
    cta: 'Ver Segmentos',
    href: '/segmentos',
  },
  {
    image: 'https://images.pexels.com/photos/15852128/pexels-photo-15852128.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1600&w=1600',
    label: 'Fragrâncias Exclusivas',
    title: 'A assinatura\nolfativa\nda sua marca',
    cta: 'Ver Fragrâncias',
    href: '/fragrancias',
  },
  {
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=80',
    label: 'Espaços de Trabalho',
    title: 'Produtividade\ne bem-estar\nem harmonia',
    cta: 'Saber Mais',
    href: '/aromaterapia',
  },
  {
    image: 'https://images.pexels.com/photos/1926811/pexels-photo-1926811.jpeg?auto=format&fit=crop&w=800&q=80',
    label: 'Spas & Bem-Estar',
    title: 'O aroma\nque transforma\ncada momento',
    cta: 'Fale Connosco',
    href: '/contactos',
  },
];

export const categoryCards = [
  {
    title: 'AROMATIZAÇÃO',
    desc: 'Difusores e fragrâncias para espaços de todas as dimensões',
    cta: 'Ver produtos',
    href: '/difusores',
    image: 'https://images.pexels.com/photos/6915107/pexels-photo-6915107.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=900',
  },
  {
    title: 'SEGMENTOS',
    desc: 'Aromatize o seu espaço e acrescente uma assinatura olfativa à sua marca',
    cta: 'Saber mais',
    href: '/segmentos',
    image: 'https://images.unsplash.com/photo-1481437156560-3205f6a55735?auto=format&fit=crop&w=900&q=80',
  },
];

export const stats = [
  { value: 30, suffix: '%', title: 'Aumento nas Vendas', desc: 'Estudos mostram que o uso de aromas pode aumentar as vendas em até 30%', isGold: true },
  { value: 20, prefix: '+', suffix: 'min', title: 'Tempo de Permanência', desc: 'Clientes passam 15-20 minutos adicionais em espaços com marketing olfativo' },
  { value: 75, suffix: '%', title: 'Reconhecimento da Marca', desc: 'Os consumidores têm mais 75% probabilidade de lembrar e reconhecer marcas', isGold: true },
  { value: 40, suffix: '%', title: 'Percepção de Qualidade', desc: 'O uso de aromas pode melhorar a percepção de qualidade dos produtos' },
];

export const testimonials = [
  {
    text: 'A parceria com a Infinity Air tem sido positiva, dado ser marcada pela proximidade e disponibilidade em solucionar as nossas necessidades. Profissionais competentes e com conhecimento intrínseco do serviço que prestam.',
    name: 'Miguel Silva',
    role: 'COO @ Hotel Moov',
  },
  {
    text: 'Gostaríamos de partilhar a nossa satisfação com os produtos adquiridos e serviço prestado pela Infinity Air. Os produtos cumprem a sua função de forma irrepreensível e, esteticamente, adequam-se aos espaços.',
    name: 'Inês Trigueiros',
    role: 'Proc. Manager @ Hotel Yeatman',
  },
  {
    text: 'Tem sido um produto de grande apreciação pelos nossos Hóspedes e Clientes, o que nos deixa deveras satisfeitos com a nossa escolha da Infinity Air.',
    name: 'Dra. Isabel',
    role: 'CEO @ Sea Porto Hotel',
  },
];

export const featuredProducts = [
  {
    name: 'Difusor Infinity Pro',
    price: '€349,00',
    image: 'https://images.unsplash.com/photo-1608571424634-58ae03e6edcf?auto=format&fit=crop&w=600&q=80',
    category: 'Difusores',
  },
  {
    name: 'Fragrância Royal Oud',
    price: '€89,00',
    image: 'https://images.pexels.com/photos/6694130/pexels-photo-6694130.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=650',
    category: 'Fragrâncias',
  },
  {
    name: 'Essência Madeira & Âmbar',
    price: '€69,00',
    image: 'https://images.unsplash.com/photo-1647934174425-61136513aed7?auto=format&fit=crop&w=600&q=80',
    category: 'Fragrâncias',
  },
  {
    name: 'Jasmine Royale',
    price: '€85,00',
    image: 'https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=650',
    category: 'Fragrâncias',
  },
];

/* ─── DIFUSORES ─────────────────────────────────────────── */
export const difusores = [
  { id: 'dif-001', name: 'Infinity Pro 3000', subtitle: 'Difusor Profissional', price: '€349,00', priceRaw: 349, category: 'Profissional', tag: 'Mais Vendido', cobertura: 'Até 3.000 m³', specs: ['Cobertura até 3.000 m³', 'Temporizador programável', 'Silencioso <25 dB', 'Conexão WiFi'], desc: 'O difusor de referência para grandes espaços hoteleiros e centros comerciais. Tecnologia de nebulização a frio preserva a integridade das fragrâncias.', image: 'https://images.unsplash.com/photo-1608571424634-58ae03e6edcf?auto=format&fit=crop&w=600&q=80' },
  { id: 'dif-002', name: 'Compact Elite', subtitle: 'Difusor Compacto', price: '€199,00', priceRaw: 199, category: 'Compacto', tag: 'Novo', cobertura: 'Até 500 m³', specs: ['Cobertura até 500 m³', 'Ultra-silencioso', 'Design discreto', 'Fácil instalação'], desc: 'Ideal para escritórios, boutiques e pequenos comércios. Design minimalista que se integra em qualquer ambiente.', image: 'https://images.pexels.com/photos/6915107/pexels-photo-6915107.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=600&w=600' },
  { id: 'dif-003', name: 'Maxi Flow X5', subtitle: 'Difusor Industrial', price: '€549,00', priceRaw: 549, category: 'Industrial', tag: '', cobertura: 'Até 8.000 m³', specs: ['Cobertura até 8.000 m³', 'Controlo remoto', 'Reservatório 5L', 'Sistema HVAC'], desc: 'Solução para grandes centros comerciais, arenas e espaços industriais. Integração direta com sistemas HVAC existentes.', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80' },
  { id: 'dif-004', name: 'Slim Touch', subtitle: 'Difusor de Parede', price: '€279,00', priceRaw: 279, category: 'Parede', tag: '', cobertura: 'Até 1.000 m³', specs: ['Cobertura até 1.000 m³', 'Ecrã touch', 'Instalação em parede', 'Programação semanal'], desc: 'Instalação em parede com ecrã tátil integrado. Perfeito para receções, lobbies e corredores de hotel.', image: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?auto=format&fit=crop&w=600&q=80' },
  { id: 'dif-005', name: 'Pocket Mini', subtitle: 'Difusor Pessoal', price: '€89,00', priceRaw: 89, category: 'Compacto', tag: '', cobertura: 'Até 50 m³', specs: ['Até 50 m³', 'Portátil USB-C', 'Bateria 12h', 'Silencioso'], desc: 'Difusor ultra-compacto e portátil. Ideal para quartos, escritórios individuais e automóveis.', image: 'https://images.pexels.com/photos/5217882/pexels-photo-5217882.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=600&w=600' },
  { id: 'dif-006', name: 'HydroScent Pro', subtitle: 'Difusor Ultrassónico', price: '€159,00', priceRaw: 159, category: 'Ultrassónico', tag: 'Destaque', cobertura: 'Até 200 m³', specs: ['Até 200 m³', 'Ultrassónico', 'Humidificação', 'LED ambiente'], desc: 'Combina difusão de aromas com humidificação do ar. LED regulável cria ambiências únicas em spas e bem-estar.', image: 'https://images.unsplash.com/photo-1543726969-a1da85a6d334?auto=format&fit=crop&w=600&q=80' },
];

/* ─── FRAGRÂNCIAS ────────────────────────────────────────── */
export const fragrancias = [
  { id: 'fra-001', name: 'Royal Oud', subtitle: 'Fragrância de Luxo', price: '€89,00', priceRaw: 89, category: 'Oriental', tag: 'Mais Vendida', volume: '500 ml', notas: 'Oud · Sândalo · Baunilha', desc: 'Uma composição intemporal com notas de oud árabe, sândalo indiano e toques de baunilha. Presença marcante e duradoura.', image: 'https://images.pexels.com/photos/6694130/pexels-photo-6694130.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=600&w=600' },
  { id: 'fra-002', name: 'White Tea & Mint', subtitle: 'Fragrância Fresca', price: '€69,00', priceRaw: 69, category: 'Fresco', tag: 'Novo', volume: '500 ml', notas: 'Chá Branco · Menta · Aloe', desc: 'Leveza e frescura em perfeita harmonia. Evoca manhãs de spa com chá branco, menta suave e toque de aloe vera.', image: 'https://images.unsplash.com/photo-1547887538-047d3a9c21c0?auto=format&fit=crop&w=600&q=80' },
  { id: 'fra-003', name: 'Madeira & Âmbar', subtitle: 'Fragrância Amadeirada', price: '€79,00', priceRaw: 79, category: 'Amadeirado', tag: '', volume: '500 ml', notas: 'Cedro · Âmbar · Musgo', desc: 'Uma fragrância quente e envolvente que transporta para florestas de cedro com notas de âmbar e musgo húmido.', image: 'https://images.unsplash.com/photo-1647934174425-61136513aed7?auto=format&fit=crop&w=600&q=80' },
  { id: 'fra-004', name: 'Brisa do Atlântico', subtitle: 'Fragrância Aquática', price: '€65,00', priceRaw: 65, category: 'Fresco', tag: '', volume: '500 ml', notas: 'Sal Marinho · Bergamota · Íris', desc: 'A essência do oceano Atlântico. Notas marinhas, bergamota cítrica e íris criam uma sensação de liberdade e ar puro.', image: 'https://images.pexels.com/photos/1374064/pexels-photo-1374064.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=600&w=600' },
  { id: 'fra-005', name: 'Jasmine Royale', subtitle: 'Fragrância Floral', price: '€85,00', priceRaw: 85, category: 'Floral', tag: 'Destaque', volume: '500 ml', notas: 'Jasmim · Rosa · Patchouli', desc: 'Um bouquet floral opulento com jasmim do Egito, pétalas de rosa de Damasco e base de patchouli sensual.', image: 'https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=600&w=600' },
  { id: 'fra-006', name: 'Citrus Burst', subtitle: 'Fragrância Cítrica', price: '€59,00', priceRaw: 59, category: 'Cítrico', tag: '', volume: '500 ml', notas: 'Limão · Laranja · Grapefruit', desc: 'Energia e vitalidade em cada difusão. Ideal para escritórios, ginásios e espaços que procuram estimular a produtividade.', image: 'https://images.pexels.com/photos/1346155/pexels-photo-1346155.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=600&w=600' },
  { id: 'fra-007', name: 'Black Velvet', subtitle: 'Fragrância Noturna', price: '€95,00', priceRaw: 95, category: 'Oriental', tag: '', volume: '500 ml', notas: 'Pralinê · Bourbon · Incenso', desc: 'Para espaços com personalidade. Pralinê, bourbon e incenso criam uma atmosfera misteriosa e sofisticada.', image: 'https://images.pexels.com/photos/3059609/pexels-photo-3059609.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=600&w=600' },
  { id: 'fra-008', name: 'Lavanda Provençal', subtitle: 'Fragrância Relaxante', price: '€72,00', priceRaw: 72, category: 'Floral', tag: '', volume: '500 ml', notas: 'Lavanda · Eucalipto · Cedro', desc: 'A tranquilidade da Provença francesa em cada respiração. Reconfortante, relaxante e ideal para spas e quartos.', image: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=600&w=600' },
];
