/**
 * paperLinks.ts — Salud Academic Paper & Research Link Generator
 *
 * Deterministically constructs high-precision academic paper search and direct links:
 * - Direct DOI Link: https://doi.org/<doi>
 * - National Center for Biotechnology Information (PubMed): https://pubmed.ncbi.nlm.nih.gov/<pmid>/
 * - Google Scholar search query: https://scholar.google.com/scholar?q=<query>
 * - Semantic / Official Journal link
 */

export interface PaperLinkable {
  title?: string;
  authors?: string;
  journal?: string;
  year?: number;
  doi?: string;
  pmid?: string;
  url?: string;
  citation?: string;
}

export interface PaperUrls {
  doiUrl?: string;
  pubmedUrl?: string;
  scholarUrl: string;
  googleSearchUrl: string;
  primaryUrl: string;
}

/**
 * Builds standard academic URLs for any evidence record or paper citation.
 */
export function buildPaperUrls(record: PaperLinkable): PaperUrls {
  const cleanDoi = record.doi
    ? record.doi.trim().replace(/^https?:\/\/doi\.org\//i, '').replace(/^doi:\s*/i, '')
    : undefined;

  const cleanPmid = record.pmid
    ? record.pmid.trim().replace(/^pmid:\s*/i, '').replace(/\D/g, '')
    : undefined;

  const doiUrl = cleanDoi ? `https://doi.org/${cleanDoi}` : undefined;
  const pubmedUrl = cleanPmid ? `https://pubmed.ncbi.nlm.nih.gov/${cleanPmid}/` : undefined;

  // Build high-accuracy search query for Google Scholar
  const queryParts: string[] = [];
  if (record.title) {
    queryParts.push(`"${record.title}"`);
  } else if (record.citation) {
    queryParts.push(record.citation);
  }

  if (record.authors) {
    const firstAuthor = record.authors.split(/,|;|and/i)[0].trim();
    if (firstAuthor) queryParts.push(firstAuthor);
  }

  if (record.journal) {
    queryParts.push(record.journal);
  }

  if (record.year) {
    queryParts.push(String(record.year));
  }

  const query = queryParts.join(' ').trim() || record.citation || 'medical research paper';
  const scholarUrl = `https://scholar.google.com/scholar?q=${encodeURIComponent(query)}`;
  const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(`${query} research paper`)}`;

  // Priority: explicit publisher url -> doi -> pubmed -> scholar
  const primaryUrl = record.url || doiUrl || pubmedUrl || scholarUrl;

  return {
    doiUrl,
    pubmedUrl,
    scholarUrl,
    googleSearchUrl,
    primaryUrl,
  };
}

/**
 * Format APA/NLM-style inline citation string
 */
export function formatPaperCitation(record: PaperLinkable): string {
  const parts: string[] = [];
  if (record.authors) parts.push(record.authors);
  if (record.year) parts.push(`(${record.year})`);
  if (record.title) parts.push(`${record.title}.`);
  if (record.journal) parts.push(record.journal);
  if (record.doi) parts.push(`DOI: ${record.doi}`);
  if (record.pmid) parts.push(`PMID: ${record.pmid}`);

  return parts.length > 0 ? parts.join(' ') : record.citation || '';
}
