---
name: microsim-vis-network
description: Create an educational MicroSim using the vis-network JavaScript library.  Each MicroSim is a directory located in the /docs/sims folder.  It has a main.html file that can be referenced with an iframe.  The main.html file imports the main JavaScript code to run the educational MicroSim.
---
# Educational MicroSim Creation Skill for Vis-Network

## Overview

This skill contains the rules for generating a Educational MicroSim using the vis.network JavaScript library.
MicroSims are lightweight, interactive educational simulations designed for browser-based learning. 
MicroSims occupy a unique position at the intersection of 

1. **Simplicity** (focused scope, transparent code)
2. **Accessibility** (browser-native, universal embedding)
3. **AI Generation** (standardized patterns, prompt-compatible design).

## Purpose

Educational MicroSims transform abstract concepts into visual interactive, manipulable experiences that enable students to learn through exploration and experimentation. Each MicroSim addresses specific learning objectives while maintaining the pedagogical rigor and technical quality necessary for educational deployment.

## Development Process

### Step 1: Educational Requirements Specification

Before generating code, articulate the educational purpose:

1. **Subject Area and Topic**: What specific concept does this simulation teach?
2. **Grade Level**: Elementary (K-5), Middle School (6-8), High School (9-12), or Undergraduate
3. **Learning Objectives**: What should students understand after using this simulation? (Align with Bloom's Taxonomy: Remember, Understand, Apply, Analyze, Evaluate, Create)
4. **Duration**: Typical engagement time (5-15 minutes recommended)
5. **Prerequisites**: What knowledge must students have before using this?
6. **Assessment Opportunities**: How can educators verify learning?

### Step 2: MicroSim Implementation with Vis-Network

Generate a self-contained, interactive vis-network.js simulation following the standardized MicroSim architecture.  The program is width responsive.

#### Folder Structure
Each Vis-Network MicroSim is contained in a folder within the /docs/sims directory.  The folder name is $MICROSIM_NAME

```
/docs/sims/$MICROSIM_NAME
/docs/sims/$MICROSIM_NAME/index.md # main index markdown for each MicroSim containing the iframe and documentation
/docs/sims/$MICROSIM_NAME/main.html # main HTML5 file containing the vis-network CDN link and importing the JavaScript
/docs/sims/$MICROSIM_NAME/$MICROSIM_NAME.js # All the vis-network JavaScript
/docs/sims/$MICROSIM_NAME/metadata.json # JSON file with Dublin core metadata and description of controls
```

### Step 3: Default Interaction Settings

**IMPORTANT**: All vis-network MicroSims embedded in textbooks via iframe MUST disable mouse-based zoom and pan, and enable navigation buttons instead.

#### Required Interaction Options

```javascript
const options = {
    // ... other options ...
    interaction: {
        zoomView: false,        // Disable mouse wheel zoom
        dragView: false,        // Disable mouse drag to pan
        navigationButtons: true // Enable built-in navigation buttons
    }
};
```

#### Rationale

These settings are mandatory for textbook embedding because:

1. **Scroll Interference**: When a vis-network diagram is embedded in a textbook page via iframe, mouse wheel zoom captures scroll events. This prevents users from scrolling through the textbook content, creating a frustrating user experience.

2. **Touch Device Conflicts**: On tablets and phones, pinch-to-zoom and drag gestures conflict with page navigation and scrolling.

3. **Accessibility**: Navigation buttons provide a consistent, discoverable interface for all users, including those using assistive technologies.

4. **Predictable Behavior**: Students expect scrolling to move through content, not zoom into diagrams.

#### Exception: Fullscreen Mode

The ONLY exception to this rule is when a diagram is displayed in fullscreen mode (not embedded in an iframe). In fullscreen mode, mouse zoom and pan may be enabled since there is no surrounding content to scroll:

```javascript
// Only for fullscreen standalone pages
const fullscreenOptions = {
    interaction: {
        zoomView: true,
        dragView: true,
        navigationButtons: true
    }
};
```

### Step 4: Standard vis-network Options Template

Use this template for all new vis-network MicroSims:

```javascript
const options = {
    layout: {
        improvedLayout: false
    },
    physics: {
        enabled: false  // Use fixed positions for educational clarity
    },
    interaction: {
        selectConnectedEdges: false,
        zoomView: false,
        dragView: false,
        navigationButtons: true
    },
    nodes: {
        shape: 'box',
        margin: 10,
        font: {
            size: 20,
            face: 'Arial'
        },
        borderWidth: 2,
        shadow: true
    },
    edges: {
        arrows: {
            to: { enabled: true, scaleFactor: 1.2 }
        },
        width: 2,
        smooth: {
            type: 'curvedCW',
            roundness: 0.4
        }
    }
};
```
