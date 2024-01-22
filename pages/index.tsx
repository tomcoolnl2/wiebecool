import * as React from 'react';
import { Layout } from '../src/layout/Layout';
import { About } from '../src/components/About';
import { Contact } from '../src/components/Contact';
import { Home } from '../src/components/Home';
import { News } from '../src/components/News';
import { Service } from '../src/components/Service';
import { Portfolio } from '../src/components/Portfolio';

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
