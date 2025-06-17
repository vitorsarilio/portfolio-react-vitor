const powerBiIframeSrc = "https://app.powerbi.com/view?r=eyJrIjoiODk1MTU1MzYtMjhmNi00ZDc3LTg4M2YtYjZjZDFmMWQ2NWVmIiwidCI6ImZhNDY2OTVmLWYwMWQtNDVkMC1hOTA1LWY0NzFjMjlmNGI5OSJ9&pageName=6c91c334232d5c05e26b";

export const PersonalProjectsSection = () => {
    return (
        <section 
            id="personal-projects" 
            className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20"
        >
            <div className="container mx-auto">
              <h2 className="text-4xl font-bold text-center mb-10 text-gray-900 dark:text-gray-100">Projetos Pessoais</h2>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-2xl max-w-5xl mx-auto border border-black/5 dark:border-white/10">
                <h3 className="text-2xl font-semibold mb-6 text-purple-700 dark:text-purple-400 text-center">Dashboard Interativo: Análise de Filmes</h3>
                <div className="aspect-w-16 aspect-h-9 h-[60vh] sm:h-[70vh] lg:h-[calc(100vh-350px)] max-h-[700px] bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden mx-auto">
                  <iframe
                    title="Vitor Sarilio Movies DB"
                    width="100%"
                    height="100%"
                    src={powerBiIframeSrc}
                    frameBorder="0"
                    allowFullScreen={true}
                    className="rounded-lg shadow-md"
                  ></iframe>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-6 text-center">
                  Este é um dashboard interativo desenvolvido no Power BI para análise de dados de filmes.
                  Explore diferentes visualizações e insights sobre o mundo cinematográfico.
                </p>
              </div>
            </div>
        </section>
    );
};