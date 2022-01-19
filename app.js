const mongoose = require('mongoose');
const express = require('express');
const app = express();
const classesRouter = require('./routes/classes');
const commentRouter = require('./routes/comments');
const userRouter = require('./routes/users');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const jwt = require('jsonwebtoken');
const User = require('./models/user');
const session = require('express-session');


mongoose.connect('mongodb://localhost:27017/tindin-classes', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected!');
});

app.use(express.json());

const sessionConfig = {
    secret: 'SenhaMuitoForte12345!!',
    resave: false,
    saveUninitialized: true
}

app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new BearerStrategy(
    async (token, done) => {
        try {
            const payload = jwt.verify(token, 'senhaforteaqui');
            const user = await User.findById(payload.id);
            done(null, user, { token: token });

        } catch (erro) {
            done(erro);
        }
    }
));



app.use('/', classesRouter);
app.use('/', commentRouter);
app.use('/', userRouter);

app.get('/', (req, res) => {
    res.send('App rodando');
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});