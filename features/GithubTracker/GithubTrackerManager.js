const { Octokit } = require("@octokit/rest");
const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
});

module.exports = (repository, channel) => {    

    // get the initial commit history and store the latest commit
    let latestCommit;
    getCommitHistory(repository).then(commits => {
        latestCommit = commits[0];
    });

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