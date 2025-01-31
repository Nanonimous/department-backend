import mongoose from 'mongoose';

// Define a schema for your data
const journalSchema = new mongoose.Schema({
    title:{
        type:Buffer,
    },
    authors:{
        type:String,
        required:true,
    },
    journal:{
        type:String,
    },
    volume:{
        type:String,
    },
    pages:{
        type:Date,
    },
    description: {
        type:String,
    }
});

// Create a model based on the schema
export default mongoose.model('journal_Detail', journalSchema);