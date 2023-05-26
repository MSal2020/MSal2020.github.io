ghpages.publish(
    'public',
    {
        branch: 'master',
        repo: 'https://github.com/MSal2020/MSal2020.github.io.git',
    },
    () => {
        console.log('Deploy Complete!')
    }
)