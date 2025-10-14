"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function ClausesPage() {
	const { t } = useLanguage();

	return (
		<section className="w-full h-full bg-gray-50 py-12 px-6">
			<div className="container mx-auto max-w-4xl bg-white shadow-md rounded-lg p-8">
				<h1 className="text-3xl font-bold text-gray-800 mb-6 text-center border-b-2 border-green-700 pb-4">
					{t("introduce.clauses.title")}
				</h1>
				<article className="space-y-6 text-gray-700 leading-relaxed text-justify">
					<p className="text-base">
						{t("introduce.clauses.intro")}
					</p>
					
					<p className="text-base">
						{t("introduce.clauses.section1")}
					</p>
					
					<p className="text-base">
						{t("introduce.clauses.section2")}
					</p>
					
					<p className="text-base">
						{t("introduce.clauses.section3")}
					</p>
					
					<p className="text-base">
						{t("introduce.clauses.section4")}
					</p>
					
					<p className="text-base">
						{t("introduce.clauses.section5")}
					</p>
					
					<p className="text-base font-semibold text-gray-900 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
						{t("introduce.clauses.conclusion")}
					</p>
				</article>
			</div>
		</section>
	);
}