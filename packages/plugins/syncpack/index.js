module.exports = {
    filter: '.',
    indent: '  ',
    dev: true,
    peer: true,
    prod: true,
    resolutions: true,
    overrides: true,
    pnpmOverrides: true,
    workspace: false,
    semverGroups: [],
    semverRange: '^',
    sortAz: ['dependencies', 'devDependencies', 'peerDependencies'],
    sortFirst: [
        'name',
        'version',
        'publishConfig',
        'private',
        'keywords',
        'description',
        'author',
        'license',
        'repository',
        'homepage',
        'bugs',
        'scripts',
        'type',
        'main',
        'dependencies',
        'devDependencies',
        'peerDependencies'
    ],
    source: [],
    versionGroups: []
};
