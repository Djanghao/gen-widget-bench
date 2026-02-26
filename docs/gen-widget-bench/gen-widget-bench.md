Task 1: GenWidget-Create
Definition
Generate a complete, runnable UI widget from scratch based on the given input conditions.

Goal
Produce a self-contained widget implementation that correctly realizes the required structure, styling, state management, and interactions, without relying on any existing implementation.

Input Conditions

Instruction only
A natural language description specifying the widget’s functionality, behavior, and constraints.

Instruction + Image

Image as Target: the image represents the desired final appearance and structure of the widget.

Image as Reference: the image provides stylistic or layout guidance without requiring pixel-level alignment.

Evaluation Focus

Code completeness and executability.

Correctness with respect to the textual instruction.

Proper widget-level structure (e.g., component boundaries, state, props).

Correct implementation of required interactions and behaviors.

Structural and visual alignment with the target or reference image when provided.

task1.png
 

Task 2: GenWidget-Edit
Definition
Modify an existing, functional UI widget to satisfy new requirements.

Goal
Update the given widget implementation to reflect the requested changes while preserving existing functionality, structure, and behavior that are not explicitly affected by the instruction.

Input Conditions

Code + Instruction
An existing widget implementation accompanied by a textual modification request.

Code + Instruction + Image

Image as Target (with Mark): the image shows the desired widget state after modification, with specific regions highlighted.

Image as Reference: the image provides stylistic or layout guidance for the modification.

Image as Current Rendering (with Mark): the image shows the current rendered widget, highlighting regions that require modification.

Evaluation Focus

Correct and complete application of the requested changes.

Minimal and localized code modifications.

Preservation of unrelated widget behavior and structure.

Alignment with visual intent when image input is provided.

Absence of unnecessary refactoring or regression.

task2.png
 

Task 3: GenWidget-Repair
Definition
Repair an existing UI widget that contains errors, defects, or incorrect behavior.

Goal
Restore the functional, visual, or execution correctness of the widget implementation without introducing new features or changing the intended behavior.

Input Conditions

Code only
A widget implementation that contains bugs or incorrect behavior.

Code + Debug Message
Debug information such as compilation errors, runtime exceptions, failing tests, or logs.

Code + Image

Image as Current Rendering (with Mark): the image reflects the current rendered result of the widget and highlights the region related to the defect.

Code + Debug Message + Image
Combined visual and debugging signals for more precise error localization.

Evaluation Focus

Correctness of the repaired widget behavior and execution.

Effective use of provided debug and visual information to identify defects.

Absence of regressions or newly introduced errors.

Minimal and targeted code changes focused on defect correction.

task3.png