const playlistService = require('./playlist.service')
const logger = require('../../services/logger.service')

async function getPlaylist(req, res) {
    try {
        const playlist = await playlistService.getById(req.params.id)
        res.send(playlist)
    } catch (err) {
        logger.error('Failed to get playlist', err)
        res.status(500).send({ err: 'Failed to get playlist' })
    }
}

async function getPlaylists(req, res) {
    console.log('hello getplay')
    try {
        const filterBy = {
            tags: req.query?.tags || [],
        }
        console.log(req.query.filterBy)
        const playlists = await playlistService.query(filterBy)
        res.send(playlists)
    } catch (err) {
        logger.error('Failed to get playlists', err)
        res.status(500).send({ err: 'Failed to get playlists' })
    }
}

async function deletePlaylist(req, res) {
    try {
        await playlistService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete playlist', err)
        res.status(500).send({ err: 'Failed to delete playlist' })
    }
}

async function updatePlaylist(req, res) {
    try {
        const playlist = req.body
        const savedPlaylist = await playlistService.update(playlist)
        res.send(savedPlaylist)
    } catch (err) {
        logger.error('Failed to update playlist', err)
        res.status(500).send({ err: 'Failed to update playlist' })
    }
}

async function addPlaylist(req, res) {
    try {
        const playlist = req.body
        const savedPlaylist = await playlistService.add(playlist)
        res.send(savedPlaylist)
    } catch (err) {
        logger.error('Failed to add playlist', err)
        res.status(500).send({ err: 'Failed to add playlist' })
    }
}

async function addDemo(req, res) {
    console.log('hello')
    try {
        const playlists = req.body
        const savedPlaylists = await playlistService.addMany(playlists)
        res.send(savedPlaylists)
    } catch (err) {
        logger.error('Failed to add playlists', err)
        res.status(500).send({ err: 'Failed to add playlists' })
    }
}

module.exports = {
    getPlaylist,
    getPlaylists,
    deletePlaylist,
    updatePlaylist,
    addPlaylist,
    addDemo
}