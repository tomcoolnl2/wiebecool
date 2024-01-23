import * as React from 'react';
import { Layout } from '../src/layout/Layout';
import { About } from '../src/components/pages/About';
import { Contact } from '../src/components/pages/Contact';
import { Home } from '../src/components/pages/Home';
import { News } from '../src/components/pages/News';
import { Service } from '../src/components/pages/Service';
import { Portfolio } from '../src/components/pages/Portfolio';

const Index = () => {
	return (
		<Layout>
			<Home />
			<About />
			<Service />
			<div className="tokyo_tm_portfolio_titles" />
			<Portfolio />
			<News />
			<Contact />
		</Layout>
	);
};
export default Index;
