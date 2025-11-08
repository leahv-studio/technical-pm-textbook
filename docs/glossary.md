# Glossary of Terms

#### Bloom's Taxonomy

A hierarchical framework of six cognitive levels used to classify educational learning objectives and outcomes.

The 2001 revision includes six levels: Remember, Understand, Apply, Analyze, Evaluate, and Create. Each level represents increasing cognitive complexity, helping educators design learning activities that progress from basic knowledge recall to higher-order thinking and creativity.

**Example:** A course on programming might have students remember syntax (level 1), understand concepts (level 2), apply them in exercises (level 3), analyze code quality (level 4), evaluate different approaches (level 5), and create original programs (level 6).

#### Claude Skills

Packaged instruction sets that guide Claude AI to perform specialized tasks in educational content creation.

Skills are stored as markdown files with YAML frontmatter containing detailed workflows, examples, and best practices. Each skill encapsulates domain expertise for specific tasks like generating glossaries, creating learning graphs, or building interactive simulations.

**Example:** The glossary-generator skill guides Claude through creating ISO 11179-compliant definitions from a concept list, ensuring consistency across all generated textbooks.

#### Concept Dependency

The prerequisite relationship between two concepts where one must be understood before the other can be learned.

Dependencies form the edges in a learning graph, creating a directed acyclic graph (DAG) that represents the optimal learning sequence. Each concept may depend on zero or more prerequisite concepts.

**Example:** Understanding "variables" is a dependency for learning "functions," which is itself a dependency for understanding "recursion."

#### Concept Mapping

The process of identifying and organizing domain knowledge into discrete, teachable concepts with defined relationships.

Concept mapping involves enumerating 150-250 concepts for a course, determining their dependencies, and categorizing them by taxonomy. This structured approach ensures comprehensive coverage and logical sequencing of learning materials.

**Example:** A data science course might map concepts like "statistics," "Python programming," and "machine learning," showing that statistics and Python are prerequisites for machine learning.

#### Course Description

A structured document that defines the scope, audience, prerequisites, topics, and learning outcomes for an educational offering.

High-quality course descriptions include title, target audience, prerequisite knowledge, main topics covered, topics not covered, and learning outcomes organized by Bloom's Taxonomy levels. This document serves as the foundation for generating all subsequent course materials.

**Example:** A course description for "Introduction to Web Development" specifies that students should know basic HTML (prerequisite) and will be able to create responsive websites (learning outcome) but won't cover advanced JavaScript frameworks (topic not covered).

#### Directed Acyclic Graph

A graph structure with directed edges and no circular paths, representing one-way relationships without loops.

In learning graphs, nodes represent concepts and directed edges represent prerequisite relationships. The acyclic property ensures no circular dependencies exist (concept A requires B, which requires A), making a valid learning sequence possible.

**Example:** A learning graph shows "arithmetic" → "algebra" → "calculus" with arrows indicating prerequisites, and no path leads back to a previous concept.

#### Dublin Core Metadata

A standardized set of 15 metadata elements for describing digital resources, including title, creator, subject, and date.

Dublin Core provides consistent resource description across different systems and domains. Intelligent textbooks use Dublin Core in MicroSim metadata.json files to ensure discoverability and proper cataloging.

**Example:** A MicroSim's metadata.json includes Dublin Core fields: "title": "Population Growth Simulation", "creator": "Claude AI", "subject": "Biology", "date": "2025-01-15".

#### FAQ

A structured collection of Frequently Asked Questions with concise answers that address common student inquiries.

FAQs are generated from course content, learning graphs, and glossary terms to help students quickly find answers to common questions. Well-designed FAQs reduce instructor workload and improve student self-service.

**Example:** An FAQ for a programming course might include "What's the difference between a list and a tuple in Python?" with a clear, concise answer and example.

#### Git Clone

A command that creates a local copy of a remote repository, including all files, history, and branches.

The `git clone` command downloads a complete repository from GitHub or other Git hosting services to your local machine, enabling you to work with the code and content offline.

**Example:** Running `git clone https://github.com/dmccreary/claude-skills.git` downloads the entire Claude Skills repository to your computer.

#### GitHub

A web-based platform for hosting Git repositories with collaboration features like pull requests, issues, and actions.

GitHub enables version control, collaborative development, and continuous deployment for software and documentation projects. Intelligent textbooks are often hosted on GitHub and deployed via GitHub Pages.

**Example:** The Claude Skills project is hosted at github.com/dmccreary/claude-skills, allowing contributors to fork, modify, and submit improvements.

#### Glossary

An alphabetically organized collection of domain-specific terms with precise, concise definitions following established standards.

High-quality glossaries use ISO 11179 standards ensuring definitions are precise, concise, distinct, non-circular, and free of business rules. Glossaries support learning by providing consistent terminology throughout educational materials.

**Example:** This file!

**Example:** A machine learning glossary defines "overfitting" as "A modeling error where a model learns training data noise rather than underlying patterns," avoiding circular references and technical jargon.

#### Intelligent Textbook

An educational resource that adapts and responds to learner interactions using structured data and interactive elements.

Intelligent textbooks range from basic hyperlinked content and interactive MicroSims (Level 2) to full AI-powered personalized learning experiences (Level 5) where students give their goals to a chatbot and it creates custom lesson plans as they progress through the content. Intelligent textbooks from level 2 to 5 incorporate learning graphs, interactive simulations (MicroSims), quizzes, and structured metadata to enhance learning outcomes.

**Example:** A Level 3 intelligent textbook on physics includes interactive simulations where students manipulate variables to observe effects on motion, adapting content based on quiz performance.

#### Interactive Simulation

A dynamic visualization that allows users to manipulate parameters and observe results in real-time.

Interactive simulations in intelligent textbooks (MicroSims) use JavaScript libraries like p5.js to create hands-on learning experiences. Students explore concepts by adjusting variables, running experiments, and seeing immediate feedback.

**Example:** A MicroSim for "projectile motion" lets students adjust launch angle and velocity with sliders, immediately showing the trajectory path and impact point.

#### ISO 11179

An international standard for metadata registries specifying how to create precise, concise, and unambiguous definitions.

The ISO 11179 metadata registry standard requires definitions to be precise (accurate), concise (brief), distinct (unique), non-circular (no self-reference), and unencumbered with business rules (no implementation details). This standard ensures glossary quality and consistency.

Intelligent textbooks use a unified [learning graph](#learning-graph) that include ISO 11179 definitions for all concepts.

**Example:** An ISO 11179-compliant definition states "A directed graph showing prerequisite relationships between concepts" rather than "A graph that you must use to organize your course before creating chapters."

#### Learning Graph

A directed graph representing concepts as nodes and their prerequisite relationships as edges.

Learning graphs guide intelligent textbook creation by mapping the optimal sequence for learning concepts. Each node represents a discrete concept, and edges show which concepts must be understood before others, forming a directed acyclic graph.

**Example:** A programming learning graph shows "variables" must be learned before "functions," which must be learned before "recursion," with arrows indicating this prerequisite flow.

#### Learning Outcomes

Specific, measurable statements describing what students will be able to do after completing an educational experience.

Learning outcomes are typically organized by Bloom's Taxonomy levels (Remember, Understand, Apply, Analyze, Evaluate, Create) and use action verbs corresponding to each cognitive level. Well-defined outcomes guide content creation and assessment design.

**Example:** "Students will be able to analyze code for efficiency" (Analyze level) or "Students will be able to create original sorting algorithms" (Create level).

#### Level-2 Textbook

An intelligent textbook that includes basic navigation, hyperlinks, and search functionality without adaptive features.

The five levels of textbook intelligence range from Level 1 (static PDFs) to Level 5 (AI-powered personalization). Level-2 textbooks use tools like MkDocs to provide navigation, cross-references, and search, representing the baseline for intelligent textbooks.

**Example:** A Level-2 textbook built with MkDocs Material includes a table of contents, search bar, and hyperlinked glossary terms, but doesn't adapt content based on student performance.

#### LRS

A Learning Record Store that receives, stores, and provides access to learning activity statements in xAPI format.

LRS systems track learner interactions with educational content, enabling analytics and reporting on learning progress. Intelligent textbooks can send xAPI statements to an LRS when students complete activities, quizzes, or simulations.

**Example:** When a student completes a MicroSim quiz, the textbook sends an xAPI statement to the LRS: "Student A completed 'Sorting Algorithms Quiz' with score 85%."

#### MicroSim

A focused interactive simulation that demonstrates a single educational concept using p5.js or similar JavaScript libraries.

MicroSims are self-contained educational tools stored in `/docs/sims/[name]/` directories, including an HTML file, JavaScript code, CSS styling, documentation, and metadata. Each MicroSim addresses one learning objective with interactive controls and visual feedback.

**Example:** A "binary search tree" MicroSim lets students insert nodes, delete nodes, and see the tree rebalance, with controls for step-by-step execution and automatic animation.

#### MkDocs

A static site generator that builds documentation websites from markdown files with automatic navigation and search.

MkDocs converts markdown content into HTML websites with themes (especially Material for MkDocs), navigation menus, search functionality, and responsive design. Intelligent textbooks use MkDocs to create professional, deployable educational websites.

**Example:** Running `mkdocs serve` launches a local development server showing your textbook with navigation, search, and formatted content at localhost:8000.

#### MkDocs Material

A modern, feature-rich theme for MkDocs providing responsive design, customization, and enhanced navigation.

Material for MkDocs adds features like dark mode, social cards, annotations, tabbed content, admonitions, and mobile optimization. This theme is the standard for intelligent textbook projects due to its professional appearance and educational features.

**Example:** MkDocs Material enables admonitions like "!!! note" to create highlighted boxes for important concepts, and tabbed content for showing multiple programming language examples.

#### Prerequisites

Knowledge, skills, or experiences that learners must possess before beginning a course or learning a concept.

Prerequisites ensure students have the foundation needed for success. Course descriptions list prerequisites explicitly, and learning graphs encode them as concept dependencies.

**Example:** A machine learning course lists "Python programming" and "basic statistics" as prerequisites, ensuring students can understand code examples and mathematical concepts.

#### Prompt Engineering

The practice of designing and refining input text to guide AI models toward producing desired outputs.

Effective prompt engineering for educational content involves clear instructions, examples, constraints, and context. Claude Skills encapsulate proven prompt patterns for specific educational tasks, enabling consistent, high-quality content generation.

**Example:** A prompt for generating quiz questions specifies "Create 5 multiple-choice questions at the Apply level of Bloom's Taxonomy, each with 4 options and one correct answer, avoiding 'all of the above' choices."

#### Quiz

An assessment instrument with questions designed to measure student understanding at specific Bloom's Taxonomy levels.

Effective quizzes align questions with learning outcomes, distribute difficulty across cognitive levels, provide immediate feedback, and include distractors that reveal common misconceptions. Quiz generators automate creation while maintaining pedagogical quality.

**Example:** A quiz on "functions in Python" includes a Remember-level question ("What keyword defines a function?") and an Apply-level question ("Write a function that returns the sum of a list").

#### Skill

A packaged set of instructions that guides an AI model to perform a specialized task following established workflows and best practices.

Skills are markdown files with YAML frontmatter stored in `.claude/skills/` directories. Each skill includes detailed workflows, decision trees, quality criteria, examples, and references that enable consistent, expert-level task execution.

**Example:** The `glossary-generator` skill contains step-by-step instructions for reading concept lists, generating ISO 11179-compliant definitions, adding examples, and creating quality reports.

#### Slash Command

A custom command triggered by typing "/" followed by a command name in Claude Code.

Slash commands are defined in markdown files within `.claude/commands/` directories. They extend Claude's functionality with project-specific or user-specific workflows, enabling quick access to common tasks.

**Example:** Typing `/skills` in Claude Code executes a custom command that lists all available skills from the `~/.claude/skills/` directory.

#### Symbolic Link

A file system reference that points to another file or directory at a different location.

Symbolic links (symlinks) enable skills to be stored in one location but accessed from multiple projects. This reduces duplication and ensures all projects use the same skill versions when skills are installed globally.

**Example:** Running `ln -s ~/claude-skills/skills/glossary-generator ~/.claude/skills/glossary-generator` creates a symlink allowing all projects to access the glossary-generator skill.

#### Target Audience

The specific group of learners for whom educational content is designed, defined by education level, background, and goals.

Identifying target audience guides content complexity, vocabulary, examples, and prerequisite assumptions. Course descriptions specify target audience to ensure content appropriately matches learner needs and abilities.

**Example:** A course targeting "high school students with basic algebra knowledge" uses different examples and pacing than one targeting "graduate students with programming experience."

#### xAPI

The Experience API standard for tracking and recording learning experiences in a consistent, interoperable format.

xAPI (formerly Tin Can API) uses JSON statements with actor-verb-object structure to describe learning activities. Intelligent textbooks can implement xAPI to send learning records to an LRS for analytics and reporting.

**Example:** An xAPI statement: `{"actor": "Student A", "verb": "completed", "object": "Chapter 3 Quiz", "result": {"score": {"scaled": 0.85}}}` records quiz completion with an 85% score.
