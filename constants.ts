
import { SystemProject, ResearchPaper } from './types';

export const HERO_TEXT = {
  headline: "I architect simulations that reason under uncertainty.",
  subtext: "Simulation Engineer · Computational Research · AI Systems"
};

export const ABOUT_TEXT = {
  title: "Engineering Reality",
  content: "I do not just analyze data; I simulate futures. My work bridges the gap between static datasets and dynamic real-world complexity. By engineering high-fidelity predictive models and stochastic simulations, I enable systems to reason through uncertainty. From logistical entropy to social dynamics, I build digital twins that optimize for survival and signal in a noisy world."
};

export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/vibhorjoshi",
  github: "https://github.com/vibhorrrrr"
};

export const PROJECTS: SystemProject[] = [
  {
    id: "second-order",
    title: "SecondOrder Simulation",
    philosophy: "In complex systems, first-order thinking is how you lose.",
    description: "A next-generation business simulation engine that models the true physics of decision-making. Unlike naive financial models, SecondOrder simulates 2nd and 3rd order systemic feedback loops i.e. competitor responses, talent flight, and brand erosion. Powered by Google Gemini 2.0 and Monte Carlo engines, it generates probability-weighted futures (P10/P50/P90) to quantify the survival rate of strategic decisions.",
    capabilities: ["Monte Carlo Simulation", "MCTS Decision Trees", "Gemini 2.0 Integration"],
    techStack: ["Python", "FastAPI", "React", "NumPy"],
    repoUrl: "https://github.com/vibhorrrrr/SecondOrder"
  },
  {
    id: "vajra",
    title: "VAJRA Legal Assistant",
    philosophy: "Access to justice must be practical, not theoretical.",
    description: "A multilingual AI legal assistant designed to demystify India's criminal laws (BNS, BNSS, BSA). Accessible via WhatsApp, VAJRA employs a Retrieval-Augmented Generation (RAG) system to map user queries to specific legal sections, generating citations and explanations in plain language to bridge the gap between citizens and the justice system.",
    capabilities: ["RAG Pipeline", "Legal NLP", "Multilingual Support"],
    techStack: ["Python", "LangChain", "WhatsApp API", "Vector DB"],
    repoUrl: "https://github.com/vibhorrrrr/VAJRA"
  },
  {
    id: "f1-strategy",
    title: "F1 Strategy Intelligence",
    philosophy: "Optimal decisions emerge from chaos and probability.",
    description: "A professional-grade race strategy engine modeling Formula One decision-making under uncertainty. Combining real-time telemetry with Monte Carlo simulations, it evaluates tire degradation, pit windows, and undercut risks to predict optimal strategies. The system processes live data to offer pit-wall-grade decision support in high-stakes environments.",
    capabilities: ["Real-Time Telemetry", "Stochastic Simulation", "Game Theory"],
    techStack: ["Python", "FastF1", "OpenF1", "Plotly"],
    repoUrl: "https://github.com/vibhorrrrr/F1-Intelligence-Suite"
  },
  {
    id: "counterfactual-lab",
    title: "Counterfactual Lab",
    philosophy: "Correlation answers what happened; Counterfactuals answer why.",
    description: "A causal inference framework designed to estimate the unseen impact of decisions. Using Difference-in-Differences (DiD) and synthetic controls, this project explicitly models what would have happened in the absence of an intervention, allowing for rigorous impact assessment beyond simple before-after comparisons.",
    capabilities: ["Causal Inference", "Difference-in-Differences", "Synthetic Controls"],
    techStack: ["Python", "StatsModels", "Scikit-Learn"],
    repoUrl: "https://github.com/vibhorrrrr/counterfactual-lab"
  },
  {
    id: "placebo-lab",
    title: "Placebo Causal Tests",
    philosophy: "A causal effect should disappear when the cause is fake.",
    description: "A robust validation pipeline for causal models. This project stresses causal claims by running hundreds of placebo simulations by faking intervention dates and randomizing treatment groups to construct an empirical null distribution. It ensures that reported effects are structural and not artifacts of noise or time trends.",
    capabilities: ["Falsification Testing", "Bootstrap Resampling", "Statistical Robustness"],
    techStack: ["Python", "Pandas", "SciPy"],
    repoUrl: "https://github.com/vibhorrrrr/placebo_causal_lab"
  },
  {
    id: "dating-lab",
    title: "Dating Retention Lab",
    philosophy: "Optimizing for love vs. retention are conflicting objectives.",
    description: "An agent-based simulation studying the trade-offs in matchmaking algorithms. By simulating user populations with latent traits (attractiveness, commitment), this lab demonstrates how algorithms optimized for retention actively suppress relationship formation to maximize platform engagement, visualizing the divergence between user success and platform growth.",
    capabilities: ["Agent-Based Modeling", "System Dynamics", "Pareto Optimization"],
    techStack: ["Python", "Simulation", "Matplotlib"],
    repoUrl: "https://github.com/vibhorrrrr/dating-retention-lab"
  },
  {
    id: "seq2seq",
    title: "Seq2Seq QA Engine",
    philosophy: "Context is the precursor to accuracy.",
    description: "Implemented Seq2Seq models (T5 & BART) for question-answering tasks on the SQUAD dataset. Enhanced context awareness and response accuracy through model fine-tuning. Leveraged attention mechanisms and ensemble learning for improved NLP performance.",
    capabilities: ["Transformer Architecture", "Attention Mechanisms", "Model Fine-tuning"],
    techStack: ["Python", "PyTorch", "HuggingFace", "T5/BART"],
    repoUrl: "https://github.com/amitingits/E-47_QuestionAnswering-seq2seq"
  },
  {
    id: "arc",
    title: "ARC Framework",
    philosophy: "Intelligence is a function of efficient routing.",
    description: "Adaptive Reasoning Collaboration (ARC) is a hybrid framework combining large foundation models (Scout 17B) with efficient edge models (Mistral 7B). Using prompt-based routing, it delegates tasks based on complexity, achieving a 42% latency reduction and cost efficiency without sacrificing context-aware accuracy.",
    capabilities: ["Hybrid Intelligence", "Model Routing", "Edge Computing"],
    techStack: ["Scout 17B", "Mistral 7B", "Python"]
  },
  {
    id: "agri-policy",
    title: "Policy Dynamics Model",
    philosophy: "Public sentiment is a temporal signal for governance.",
    description: "A temporal simulation framework (RNN + Transformer) designed to model the reaction dynamics of agricultural policies. By simulating the propagation of sentiment through public discourse over time, it provides a look-ahead assessment mechanism for governance strategy and stability.",
    capabilities: ["Temporal Modeling", "Hybrid Architectures", "NLP"],
    techStack: ["TensorFlow", "Keras", "Python"],
    paperUrl: "https://ieeexplore.ieee.org/document/10915148/"
  }
];

export const RESEARCH: ResearchPaper[] = [
  {
    id: "paper1",
    title: "Quantifying Effectiveness of Governmental Agriculture Policies using RNN-Transformer based Sentiment Analysis",
    venue: "IDCIoT 2025",
    year: "2025",
    abstract: "Presented a hybrid RNN-Transformer based sentiment analysis framework for policy evaluation.",
    url: "https://ieeexplore.ieee.org/document/10915148/"
  },
  {
    id: "paper2",
    title: "A Novel Method for Detecting Alveolar Bone Loss",
    venue: "Copyright / Collaboration",
    year: "2024",
    abstract: "Collaborative research with Swargiya Dadasaheb Kalmegh Smriti Dental College using InceptionV3 & ResNet50.",
    url: "https://www.linkedin.com/posts/vibhorjoshi_copyright-activity-7272977310977269762-nldU?utm_source=share&utm_medium=member_desktop&rcm=ACoAADZ8zFABrkfzqb_Z1JtVPJO72p-XNFmhJqI"
  },
  {
    id: "paper3",
    title: "Adaptive Reasoning Collaboration: A Hybrid Intelligence Framework for Efficient Multi-Agent Reasoning",
    venue: "IETACS",
    year: "2025",
    abstract: "Optimizing large-scale reasoning tasks through hierarchical agent delegation."
  }
];
