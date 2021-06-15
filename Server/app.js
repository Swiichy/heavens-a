var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const PORT = process.env.PORT || 5000;
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
app.use(express.json());
app.use(cors());

//Connection au build REACT
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//-----------------------------------------------------------------------------------//
mongoose.connect('mongodb+srv://swiichy:alphabeta@cluster0.ty0vk.mongodb.net/heavenMember?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.post('/insert', async (req, res) => {

    const memberPseudo = req.body.memberPseudo;
    const memberLevel = req.body.memberLevel;
    const memberClasse = req.body.memberClasse;
    const memberSucces = req.body.memberSucces;
    const memberRang = req.body.memberRang;

    const Member = new MemberModel({
        memberPseudo: memberPseudo,
        memberLevel: memberLevel,
        memberClasse: memberClasse,
        memberSucces: memberSucces,
        memberRang: memberRang
    });

    try {
        await Member.save();
        res.send("inserted data");
    } catch (err) {
        console.log(err);
    }
})

app.get('/read', async (req, res) => {
    MemberModel.find({}, (err, result) => {
        if (err) {
            res.send(err)
        } 

        res.send(result)
    })
});

app.put('/update', async (req, res) => {

    const newMemberPseudo = req.body.newMemberPseudo;
    const id = req.body.id;

    try {
        await MemberModel.findById(id, (err, updateMember) => {
            updateMember.memberPseudo = newMemberPseudo
            updateMember.save();
            res.send("update");
        })
    } catch (err) {
        console.log(err);
    }
})

app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    
    await MemberModel.findByIdAndRemove(id).exec();
    res.send("deleted");
});

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});


module.exports = app;
