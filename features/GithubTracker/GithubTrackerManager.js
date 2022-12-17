const { Octokit } = require("@octokit/rest");
const octokit = new Octokit({
    auth: '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'
});

module.exports = (repository, channel) => {    
    // run the commit check every 60 seconds
    setInterval(async () => {
    const commits = await getCommitHistory(repository);
    const newCommit = commits[0];

    // if the latest commit has changed, send a notice to the Discord channel
    if (latestCommit.sha !== newCommit.sha) {
        latestCommit = newCommit;
        sendCommitMessage(channel, latestCommit);
    }
    }, 60000);
    
}

// get the commit history for the repository
async function getCommitHistory(repository) {
    const commits = await octokit.repos.listCommits({
        owner: "CuongVnZ",
        repo: repository
    });
    return commits;
}

function sendCommitMessage(channel, commit) {
    channel.send(`A new commit was made to ${repo.full_name} 
    by ${commit.commit.author.name} 
    on ${commit.commit.author.date}: "${commit.commit.message}"`);
}