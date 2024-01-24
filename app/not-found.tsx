import Link from 'next/link';

export default async function NotFound() {
	return (
		<div>
			<h2>Helaas</h2>
			<p>Deze pagina bestaat niet!</p>
			<p>
				Begin <Link href="/blog">opnieuw...</Link>
			</p>
		</div>
	);
}
