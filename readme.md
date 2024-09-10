## Problem Statement

You need to create a basic article management application using React. The app will show a list of articles, each with its own tags. Users can click on tags to filter articles and can also manage the tags for each article. Here’s what the application should do:

1. Display Articles: Show a list of articles, each with a title and a set of tags.
2. Show Tags: Include a header that lists all unique tags from the articles, along with a count of how many articles are associated with each tag.
3. Filter by Tags: When a user clicks on a tag in the header, it should either select or deselect the tag. If selected, we add the newly selected tag in the list of already selected tags and display articles that contain all the selected tags. If deselected, we remove the tag from the list of selected tags and the articles will be filtered accordingly on the basis of the remaining selected tags.
4. Manage Tags on Articles: Allow users to remove tags from each article. After removing a tag, the application should update the article list and tag count instantly. If an article has only one tag left, users should not be able to remove it to ensure that every article has at least one tag.
5. Manage State: Use effective state management to keep track of articles and their tags.

## Instructions for the candidate

1. Understanding the Data Structure: Review the `ARTICLES` array from `src/data.js` and understand how articles and tags are structured.
2. We already have components for rendering a list of tags in the header - `TagsList` and the list of articles in the body - `ArticlesList` but the `tags` given to `TagsList` in the props are hardcoded. You need to derive the unique `tags` with count from the the unfiltered articles and pass that to the `TagsList`.
3. Implement Filtering Logic: Complete the `filteredArticles` logic to ensure it filters based on selected tags - include the article as part of the `filteredArticles` only if the article is tagged with all the tags that are selected in the filter in the header.
4. State Management: Focus on proper state management, ensuring updates to article tags reflect in both the article list and the tag header. Also ensure that users should not be able to remove all the tags on a given article to ensure that every article has at least one tag.

## Submission Instructions

1. Clicking "Run code" will compile and run your code against sample tests, but it will not generate scores. Click on "Execution Log" to better understand the test execution.
2. Clicking "Submit code" will run your code against multiple test cases, assessing different scenarios holistically. The score will be assigned accordingly.

To access the instructions, click on the "Question" button which can be found in the bottom left corner of the screen.
