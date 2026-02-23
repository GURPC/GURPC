export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  category: string;
  author: string;
  content: string;
  tags?: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 4,
    title: "Find the Right Journal for Your Research Paper: 12 Free Journal Finder Tools",
    slug: "12-free-journal-finder-tools",
    excerpt: "Deciding where to submit your manuscript is often the hardest part. These 12 free journal finder tools can help you quickly and smartly discover the most suitable journal for your research.",
    date: "Feb 23, 2026",
    category: "Resource",
    author: "GURPC",
    tags: ["journal", "publishing", "tools", "research"],
    content: `# Find the Right Journal for Your Research Paper

Deciding where to submit your manuscript is often the hardest part of the publishing process. Whether you're in **Medicine, Engineering, Social Sciences, or Interdisciplinary Research**, choosing the right journal can make or break your publication journey.

These **12 free journal finder tools** match journals based on your paper's **scope, impact factor, and indexing** — helping you submit smarter and faster.

---

## 📚 12 Free Journal Finder Tools

### 1. Elsevier Journal Finder
Paste your abstract and get matched with Elsevier journals ranked by relevance, impact factor, and acceptance rate.

🔗 [https://journalfinder.elsevier.com/](https://journalfinder.elsevier.com/)

---

### 2. Springer Nature Journal Suggester
Ideal for science, technology, and medical research. Provides match scores based on title and abstract analysis.

🔗 [https://journalsuggester.springer.com/](https://journalsuggester.springer.com/)

---

### 3. Wiley Journal Finder
Covers a broad range of disciplines from humanities to engineering. Suggests journals with open access options clearly highlighted.

🔗 [https://journalfinder.wiley.com/](https://journalfinder.wiley.com/)

---

### 4. Taylor & Francis Journal Suggester
Great for social sciences, education, and humanities research. Shows journal metrics and submission guidelines.

🔗 [https://journalsuggester.tandfonline.com/](https://journalsuggester.tandfonline.com/)

---

### 5. IEEE Publication Recommender
The go-to tool for **Electrical Engineering, Computer Science, and IT** researchers. Recommends IEEE journals and conferences.

🔗 [https://publication-recommender.ieee.org/](https://publication-recommender.ieee.org/)

---

### 6. PLOS Journal Selector
Focused on open-access publishing. Perfect for biology, medicine, and interdisciplinary life sciences research.

🔗 [https://journals.plos.org/plosone/s/journal-selector](https://journals.plos.org/plosone/s/journal-selector)

---

### 7. MDPI Journal Finder
Search across 400+ open-access journals. Shows impact factor, indexing, and APC information upfront.

🔗 [https://www.mdpi.com/journalfinder](https://www.mdpi.com/journalfinder)

---

### 8. JANE (Journal/Author Name Estimator)
A unique tool from biosemantics that matches your abstract against PubMed-indexed journals. Excellent for biomedical and health science papers.

🔗 [https://jane.biosemantics.org/](https://jane.biosemantics.org/)

---

### 9. JournalGuide
An independent, publisher-neutral tool. Compares journals across publishers and shows community reviews and metrics.

🔗 [https://www.journalguide.com/](https://www.journalguide.com/)

---

### 10. Edanz Journal Selector
Powered by AI, it analyzes your manuscript details and suggests journals with acceptance likelihood estimates.

🔗 [https://www.edanz.com/journal-selector](https://www.edanz.com/journal-selector)

---

### 11. Enago Journal Finder
Another AI-powered tool that provides detailed journal comparisons including APC, review speed, and indexing databases.

🔗 [https://www.enago.com/journal-finder/](https://www.enago.com/journal-finder/)

---

### 12. SCImago Journal & Country Rank (SJR)
Not a finder per se, but essential for **checking journal rankings, quartile (Q1–Q4), H-index, and citation metrics**. Use it to verify any journal before submitting.

🔗 [https://www.scimagojr.com/](https://www.scimagojr.com/)

---

## ✅ Before You Submit — Checklist

Before submitting your manuscript to any journal, make sure to verify:

- **Scope** — Does the journal publish papers in your specific research area?
- **Indexing** — Is it indexed in Scopus, Web of Science, PubMed, or DOAJ?
- **APC (Article Processing Charge)** — What are the publication fees? Are there fee waivers?
- **Peer-Review Timeline** — How long does the review process typically take?
- **Impact Factor / SJR** — What is the journal's standing in its field?
- **Open Access Options** — Does it support Gold, Green, or Hybrid OA?

---

## 💡 Pro Tips for GURPC Members

1. **Start with 2–3 finder tools** to cross-reference suggestions
2. **Check the journal's recent publications** to ensure your topic fits
3. **Avoid predatory journals** — verify using [Beall's List](https://beallslist.net/) or [Think. Check. Submit.](https://thinkchecksubmit.org/)
4. **Ask your advisor or GURPC mentors** for journal recommendations specific to your field
5. **Track submission deadlines** for special issues — they often have faster review times

---

*Published by GURPC — Green University Research & Publication Community*`,
  },
  {
    id: 1,
    title: "GURPC Wins Best Research Award at TechFest 2025",
    slug: "gurpc-wins-techfest-2025",
    excerpt: "Our team's project on IoT-based Smart Agriculture secured the first position among 50 universities.",
    date: "Jan 15, 2026",
    category: "Achievement",
    author: "Admin",
    tags: ["achievement", "award", "IoT"],
    content: `# GURPC Wins Best Research Award at TechFest 2025

Our team's project on **IoT-based Smart Agriculture** secured the **first position** among 50 universities at TechFest 2025.

The project demonstrated a complete end-to-end solution for monitoring soil moisture, temperature, and humidity using IoT sensors, with data visualization through a custom-built dashboard.

## Key Highlights

- **50+ universities** participated in the research showcase
- Our team presented a working prototype with real-time sensor data
- The judges praised the practical applicability for Bangladeshi agriculture
- The project was a collaboration between CSE and EEE department members

This achievement showcases GURPC's commitment to applied research that addresses real-world problems in Bangladesh.

*Congratulations to the entire team!*`,
  },
  {
    id: 2,
    title: "Understanding Large Language Models: A Beginner's Guide",
    slug: "understanding-llms",
    excerpt: "A deep dive into how transformers work and how you can start building your own AI applications.",
    date: "Dec 12, 2025",
    category: "Technical",
    author: "Md. Saklain",
    tags: ["AI", "LLM", "machine learning", "tutorial"],
    content: `# Understanding Large Language Models: A Beginner's Guide

Large Language Models (LLMs) like GPT, LLaMA, and Gemini have revolutionized how we interact with AI. But how do they actually work?

## What is a Transformer?

The transformer architecture, introduced in the 2017 paper "Attention Is All You Need," is the foundation of modern LLMs. It uses a mechanism called **self-attention** to process input sequences in parallel rather than sequentially.

## Key Concepts

- **Tokenization** — Breaking text into smaller units (tokens) the model can process
- **Embeddings** — Converting tokens into numerical vectors
- **Self-Attention** — Allowing the model to weigh the importance of different parts of the input
- **Feed-Forward Networks** — Processing the attention output through neural network layers

## Getting Started

If you want to experiment with LLMs:

1. Start with the **Hugging Face Transformers** library
2. Try fine-tuning a small model like **DistilBERT** on a custom dataset
3. Explore **LangChain** for building LLM-powered applications
4. Join GURPC's AI & Data Science research group for collaborative learning

## Resources

- [Hugging Face Course](https://huggingface.co/learn)
- [Andrej Karpathy's Neural Networks: Zero to Hero](https://karpathy.ai/zero-to-hero.html)
- [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/)

*Written by Md. Saklain — GURPC AI Research Division*`,
  },
  {
    id: 3,
    title: "5 Tips for Writing Your First Conference Paper",
    slug: "tips-conference-paper",
    excerpt: "Essential advice for undergraduates looking to publish their research in IEEE or Springer conferences.",
    date: "Nov 30, 2025",
    category: "Guide",
    author: "Dulal Hossain",
    tags: ["writing", "conference", "tips", "publishing"],
    content: `# 5 Tips for Writing Your First Conference Paper

Publishing a conference paper as an undergraduate can feel overwhelming. Here are five practical tips to help you get started.

## 1. Start with a Clear Problem Statement

Your paper should address a specific problem. Don't try to solve everything — focus on one well-defined research question.

## 2. Follow the Template Exactly

IEEE and Springer conferences provide LaTeX or Word templates. Use them from day one. Formatting issues are the #1 reason papers get desk-rejected.

## 3. Write the Introduction Last

Start with your methodology and results. The introduction is easier to write when you already know what your paper contains.

## 4. Get Feedback Early and Often

Share drafts with your advisor and peers. Join GURPC's paper review sessions where experienced members provide constructive feedback.

## 5. Mind the Deadline

Conference deadlines are absolute. Plan backwards from the submission date:

- **8 weeks out:** Finalize experiments
- **6 weeks out:** Write first draft
- **4 weeks out:** Internal review and revisions
- **2 weeks out:** Final polishing and formatting
- **1 week out:** Submit and breathe

## Common Mistakes to Avoid

- Plagiarism (even self-plagiarism) — always cite properly
- Overstating results — be honest about limitations
- Ignoring reviewer comments in revisions
- Submitting to predatory conferences

*Good luck with your first paper! The GURPC community is here to help.*

*Written by Dulal Hossain — GURPC Research Mentor*`,
  },
];
