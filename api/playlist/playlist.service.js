const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    remove,
    update,
    add,
    addMany
}

async function query(filterBy = {}) {
    // const criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection('playlist')
        var playlists = await collection.find({tags: filterBy.tags}).toArray()
        playlists = playlists.map(playlist => {
            playlist.createdAt = ObjectId(playlist._id).getTimestamp()
            return playlist
        })
        return playlists
    } catch (err) {
        logger.error('cannot find playlists', err)
        throw err
    }
}

async function getById(playlistId) {
    try {
        const collection = await dbService.getCollection('playlist')
        const playlist = await collection.findOne({ _id: ObjectId(playlistId) })
        return playlist
    } catch (err) {
        logger.error(`while finding playlist ${playlistId}`, err)
        throw err
    }
}
async function remove(playlistId) {
    try {
        const collection = await dbService.getCollection('playlist')
        await collection.deleteOne({ '_id': ObjectId(playlistId) })
    } catch (err) {
        logger.error(`cannot remove playlist ${playlistId}`, err)
        throw err
    }
}

async function update(playlist) {
    try {
        // peek only updatable properties
        const playlistToSave = {
            _id: ObjectId(playlist._id), // needed for the returnd obj
            name: playlist.name,
            description: playlist.description,
            imgUrl: playlist.imgUrl,
            tags: playlist.labels,
            createdAt: playlist.createdAt,
            createdBy: playlist.createdBy,
            songs: playlist.songs 
        }
        const collection = await dbService.getCollection('playlist')
        await collection.updateOne({ _id: playlistToSave._id }, { $set: playlistToSave })
        return playlistToSave
    } catch (err) {
        logger.error(`cannot update playlist ${playlist._id}`, err)
        throw err
    }
}

async function add(playlist) {
    try {
        // peek only updatable fields!
        // const playlistToAdd = { //not sure if this is needed 
        //     name: playlist.name,
        //     description: playlist.description,
        //     imgUrl: playlist.imgUrl || '',
        //     tags: playlist.labels,
        //     createdAt: playlist.createdAt,
        //     createdBy: playlist.createdBy,
        //     songs: playlist.songs
        // }
        const collection = await dbService.getCollection('playlist')
        await collection.insertOne(playlist)
        return playlist //returns without id
    } catch (err) {
        logger.error('cannot insert playlist', err)
        throw err
    }
}

async function addMany(playlists) {
    try{
        const collection = await dbService.getCollection('playlist')
        console.log(playlists, 'playlists')
        await collection.insertMany(playlists)
        return playlists
    } catch (err) {
        logger.error('cannot insert playlists', err)
        throw err
    }
}

